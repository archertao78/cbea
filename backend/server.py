import json
import os
import sqlite3
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib import error, request

ROOT_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = ROOT_DIR / 'www.cbea.com.hk'
DB_PATH = ROOT_DIR / 'data' / 'stock_analysis.db'
GEMINI_URL_TEMPLATE = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}'

PRESET_PROMPT = """你是一名专业美股分析师，请基于公开市场常识输出结构化分析。
请严格按以下结构输出：
1. 公司与业务概览（3-5点）
2. 近期核心驱动因素（宏观/行业/公司层面）
3. 财务与估值观察（收入、利润、现金流、估值角度）
4. 技术面简析（趋势、支撑阻力、成交量角度）
5. 风险清单（至少3条）
6. 情景判断（乐观/中性/谨慎）和对应理由
7. 给普通投资者的操作建议（仅教育用途，非投资建议）
要求：
- 使用中文
- 适当使用小标题和项目符号
- 不要编造实时价格，若无法确认请明确说明
- 最后附上一段“免责声明”"""


def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS analyses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                stock_name TEXT NOT NULL,
                stock_code TEXT NOT NULL,
                analysis_text TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def call_gemini(stock_name: str, stock_code: str) -> str:
    api_key = os.getenv('GEMINI_API_KEY', '').strip()
    if not api_key:
        raise RuntimeError('后台未配置 GEMINI_API_KEY 环境变量。')

    prompt = f"{PRESET_PROMPT}\n\n分析股票名称：{stock_name}\n分析股票代码：{stock_code}"
    payload = {
        'contents': [{'role': 'user', 'parts': [{'text': prompt}]}],
        'generationConfig': {'temperature': 0.5, 'topP': 0.9, 'maxOutputTokens': 2048},
    }

    req = request.Request(
        GEMINI_URL_TEMPLATE.format(api_key=api_key),
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST',
    )

    try:
        with request.urlopen(req, timeout=30) as resp:
            response_data = json.loads(resp.read().decode('utf-8'))
    except error.HTTPError as exc:
        body = exc.read().decode('utf-8', errors='ignore')
        raise RuntimeError(f'Gemini 请求失败（HTTP {exc.code}）：{body}') from exc
    except error.URLError as exc:
        raise RuntimeError(f'Gemini 网络请求失败：{exc.reason}') from exc

    text_parts = response_data.get('candidates', [{}])[0].get('content', {}).get('parts', [])
    result = ''.join(part.get('text', '') for part in text_parts).strip()
    if not result:
        raise RuntimeError('Gemini 未返回有效分析内容。')
    return result


class ApiAndStaticHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC_DIR), **kwargs)

    def do_GET(self):
        if self.path == '/api/analyses':
            self.handle_list_analyses()
            return
        if self.path.startswith('/api/analyses/'):
            self.handle_get_analysis()
            return
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/analyze':
            self.handle_analyze()
            return
        self.send_error(404, 'Not Found')

    def handle_list_analyses(self):
        with get_db_connection() as conn:
            rows = conn.execute(
                'SELECT id, stock_name, stock_code, created_at FROM analyses ORDER BY id DESC LIMIT 50'
            ).fetchall()
        payload = [dict(row) for row in rows]
        self.send_json(200, payload)

    def handle_get_analysis(self):
        analysis_id = self.path.rsplit('/', 1)[-1]
        if not analysis_id.isdigit():
            self.send_json(400, {'error': '无效的结果 ID'})
            return
        with get_db_connection() as conn:
            row = conn.execute(
                'SELECT id, stock_name, stock_code, analysis_text, created_at FROM analyses WHERE id = ?',
                (int(analysis_id),),
            ).fetchone()
        if not row:
            self.send_json(404, {'error': '未找到对应分析结果'})
            return
        self.send_json(200, dict(row))

    def handle_analyze(self):
        content_len = int(self.headers.get('Content-Length', '0'))
        raw = self.rfile.read(content_len)
        try:
            data = json.loads(raw.decode('utf-8'))
        except json.JSONDecodeError:
            self.send_json(400, {'error': '请求体必须是 JSON'})
            return

        stock_name = str(data.get('stockName', '')).strip()
        stock_code = str(data.get('stockCode', '')).strip().upper()
        if not stock_name or not stock_code:
            self.send_json(400, {'error': '股票名称和代码都不能为空'})
            return

        try:
            analysis_text = call_gemini(stock_name, stock_code)
        except RuntimeError as exc:
            self.send_json(502, {'error': str(exc)})
            return

        now = datetime.now(timezone.utc).isoformat()
        with get_db_connection() as conn:
            cursor = conn.execute(
                'INSERT INTO analyses(stock_name, stock_code, analysis_text, created_at) VALUES (?, ?, ?, ?)',
                (stock_name, stock_code, analysis_text, now),
            )
            analysis_id = cursor.lastrowid
            conn.commit()

        self.send_json(
            201,
            {
                'id': analysis_id,
                'stock_name': stock_name,
                'stock_code': stock_code,
                'analysis_text': analysis_text,
                'created_at': now,
            },
        )

    def send_json(self, code, data):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == '__main__':
    init_db()
    host = '0.0.0.0'
    port = int(os.getenv('PORT', '8000'))
    server = ThreadingHTTPServer((host, port), ApiAndStaticHandler)
    print(f'Server running at http://{host}:{port}')
    server.serve_forever()
