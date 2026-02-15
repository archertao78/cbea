US Stock Analyzer (Backend + Frontend)

Run:
1) export GEMINI_API_KEY=your_key
2) python3 backend/server.py
3) Open http://127.0.0.1:8000/ai-stock-analyzer.html

Architecture:
- Frontend pages:
  - www.cbea.com.hk/ai-stock-analyzer.html
  - www.cbea.com.hk/ai-stock-result.html
- Backend API + static server:
  - backend/server.py
- Backend persistence:
  - data/stock_analysis.db (SQLite)
