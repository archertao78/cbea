"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[728],{5728:function(t,e,s){s.r(e),s.d(e,{default:function(){return c}});var i=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"member-box"},[e("div",{staticClass:"member-header"},[e("h1",[t._v(t._s(t.memberInfos.title))]),e("p",[t._v(t._s(t.memberInfos.name)+"|"+t._s(t.memberInfos.company))]),e("p",[t._v(t._s(t.memberInfos.describe))])]),e("div",{staticClass:"member-video"},[e("video",{attrs:{src:"./static/image/"+t.memberInfos.video,controls:""}})]),e("h1",[t._v(t._s(t.$t("Membershipstyle.text")))]),e("div",{staticClass:"Membershipstyle-view"},t._l(t.memberList,(function(i,o){return e("div",{key:o,staticClass:"Membershipstyle-item",on:{click:function(e){return t.onDateils(i)}}},[e("div",{staticClass:"video"},[e("img",{attrs:{src:"./static/image/"+i.cover,alt:""}}),e("img",{attrs:{src:s(3781),alt:""}})]),e("div",{staticClass:"content"},[e("p",[t._v(t._s(i.title))]),e("p",[t._v(t._s(i.name)+" | "+t._s(i.company))])])])})),0)])])},o=[],n=(s(7658),s(6154)),l={data:()=>({memberInfos:{},memberList:[],list:[]}),computed:{},watch:{$route:{handler(t,e){const s=this.$route.query.id;s&&this.intData(s)},immediate:!0}},created(){const t=this.$route.query.id;this.intData(t)},methods:{onDateils(t){window.scrollTo({top:0}),this.$router.push({path:"/member",query:{id:t.id}})},intData(t){const e=localStorage.getItem("lang");switch(e){case"en":n.Z.get("/static/lang/en.json",{}).then((({data:e})=>{console.log("获取到的json数据",e),this.list=e.MembershipstyleList;const s=this.list.filter((e=>e.id==t));s.length>0&&(this.memberInfos=s[0],console.log(this.memberInfos,"===")),this.memberList=this.list.filter((e=>e.id!=t))}));break;case"Czh":n.Z.get("/static/lang/Czh.json",{}).then((({data:e})=>{console.log("获取到的json数据",e),this.list=e.MembershipstyleList;const s=this.list.filter((e=>e.id==t));s.length>0&&(this.memberInfos=s[0],console.log(this.memberInfos,"===")),this.memberList=this.list.filter((e=>e.id!=t))}));break;default:n.Z.get("/static/lang/zh.json",{}).then((({data:e})=>{console.log("获取到的json数据",e),this.list=e.MembershipstyleList;const s=this.list.filter((e=>e.id==t));s.length>0&&(this.memberInfos=s[0],console.log(this.memberInfos,"===")),this.memberList=this.list.filter((e=>e.id!=t))}));break}},goBack(){this.$router.go(-1)}}},m=l,r=s(1001),a=(0,r.Z)(m,i,o,!1,null,"7b49efec",null),c=a.exports},3781:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAAXNSR0IArs4c6QAABT9JREFUeF7tnFvIpVMYx38PIeezjMgph4wRoVyISAwX5DDDSBlSylkUipHzsRDu5HDlNDPFBcONSLmSiUYoxoVTzIVTMTce7//71p55v/3td+/3sNaevVmrpqmZd51++1lrPae1jDEVdzdgIXA8cARwOHAosCuwc/ij0fwR/vwGfA18BXwJfAysMzMfx5A12GTF3TXpC4CzgNOAfTp29jPwHvAOsNrMBC9JiQ4mSMZi4HLgXGD7JCOHv4A3gZeANbElKRoYd98KWArcUfyaxySCUdXsp8BDwGtm9k+MvqOAcXctlSeBI2MMqkMbXwA3mZmWWqfSCYy7719snk8AF3UaRfzKK4Gbzey7tk23BuPuFwLPFZKyW9vOE9f7FbjKzFa16acxGHffDngcuBZoXL/NIDvU0dH+LHCrmW1s0k6jibm7pOMN4JQmnUzAtx8A55mZpKhWqQ3G3RfoWNwCJ06tidT4SCfXYjP7sca39ZZCgPIhcEidRif4m2+Ak+vAGSkxYfm8P8WS0v87SXJOHbWshoIJG+27U7injBJa7TlnDtuQR4F5GrhuVC9T+v/PmNn1VWOvBBP0lNen4Ehu+7voKF9SpecMBBM02s8mWHlrC6O/no7vRYM05CowkpRJU/NjwehvZ6WZLen/x3lggkEofeX/VKTfzDE854AJroPPg4ctFhg5kz4CDpoA67tqTvIQHlV2WfSDuaSA8nIsIsD3wIk9hcrd5cV7FDghYh+xmlpmZq/0GtsEJnje1kZW5FaY2X3lkYd+lgEPBCmKNbGu7UjxO7bnCSyDORt4q2vrffUvNbOBEhiUxxuCx2/3yP22be4cM3tblctgJEYXt22xot5SM9MJV1ncfU/gTuAaYNvI/Tdt7lUz03YyCyZ482V1xnZcjwTTG7m7K5Qiv63UhJE2XNMZ1/xeDvYFij70wFwBPF+zcpPPaoMpAToJeExWcJOOIn57pZm90AOTYhlprI3BlAApHvUwcFjESddpamY5WTglfooQDBvUaWswYYlvA1wNrChclHvXmVWEbxTU21dgjgZkF6UoncCUpGcX4HaFRhLsg4PmvUhgFDF8MQWVLktp0Hjc/QDgfuAyQAG+VGW5wDwYdIkUnUSRmP6BuftxQYM+I8WgdToKjOIu2uhSlCRgSktMSqlMDG0HMctqgflEqnDMVkttJQUTNuitAakb9wD7RZrHWoFZn9BmSQ6mJD07Fnk1twC3FVK0Q0dA3wrMBkBqeYoyNjAlQEpOUg5Nl+N9g8D8XWw2CrumKGMHE5aXjnaZF23LxgxmMLoZML8Ae7VFO6Le2CXG3aMtJYUtD552MO4ec/Nd/185rpcXmvC9sY9rZR8pCShFSbqU3D2VgrdqWk0CKaTy2SQ1CbIROX+tzBiR2e0wH8yM20FevOyo2gxn1lEVNMVJdG2eH1ybunMwzjLr2gxgsjN8M/o5znBdhpiE8ImcZso8mIzwScLlNFKPcfc9gLsmMuAWwOQQLQwM0Up8Ywf17zYzqeqbytQF9YPUxE4D+SGkgehvhYJPL8Ifj0xVGkgYuEIS6yIn+PweEocOjNxuzCNc13kWViYOBTi6e5RTzQZhL5w9OTmxAowuaOV01go48tHkBOgKODllvgKMwir5kkUFHN1qy9dyKuDodlu+yDUETr76N2RZ5cuiQzbkfL24yiDJF9KHmGr5CYMRdmy44/RU5Os8baxnXa+5cYs/etHngMrPpAz7KfPDOjUEPT/FVA9S/+NdesBLTyLI5Nip7/GuP4sscN1wVe6O9o2xP971L4N3Os0t22sqAAAAAElFTkSuQmCC"}}]);
//# sourceMappingURL=728.6c409e28.js.map