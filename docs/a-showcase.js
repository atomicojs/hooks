import{u as e,a as r,b as t,d as o,e as s,c as a}from"./chunks/1d8d81c9.js";import{u as n}from"./chunks/ffece87a.js";function c(){return(c=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e}).apply(this,arguments)}let i=["touchend","mouseup","mouseleave","touchleave","click"],l=["mousemove","touchmove"];function d(e,r){window.addEventListener(e,r)}function h(e,r){window.removeEventListener(e,r)}const u=({src:r,width:u,height:p,origin:b})=>{const f=t(),w=t(),g=t(),v=o();let x,[m,y]=e();const k=function(r){let[t]=e(()=>{function e(...e){return t.callback(...e)}function r(s){if(!t.capture)return;o(s,!1);let{capture:a}=t;t.capture=!1,i.forEach(e=>h(e,r)),l.forEach(e=>h(e,o)),e("end",a)}function o(r,o){if(!t.capture)return;let s,a;if(/touch/.test(r.type)){let e=r.touches[0];if(!e)return;s=e.clientX,a=e.clientY}else s=r.clientX,a=r.clientY;t.capture.push({x:s,y:a,t:r.timeStamp}),o||e("move",t.capture)}return{slide:-1,events:{startCapture:function(s){t.capture=[],i.forEach(e=>d(e,r)),l.forEach(e=>d(e,o)),o(s,!0),e("start",t.capture)}}}});return t.callback=r,{ref:t,ontouchstart:t.events.startCapture,onmousedown:t.events.startCapture}}((e,r)=>{if("start"==e&&(x=v.current.getBoundingClientRect()),"move"==e){const e=r[r.length-1].x-x.x,t=g.current?g.current.clientWidth+22:50,o=(e<t?t:e)/x.width*100;w.current.style.width=(o>100?100:o<0?0:o)+"%"}}),[z,C]=n(()=>{return import((e=r,(/^(http(s){0,1}:){0,1}\/\//.test(e)?"":"./")+r)).then(e=>({default:e}));var e},!0),j="done"==z,E=j?[].concat(C.default):[];return m=m||j&&E[0].label,s(()=>{const{render:e,rendered:r}=E.find(({label:e})=>e==m)||{};e&&C.render(e(),f.current),r&&r(f.current)},[j,m]),a("host",{shadowDom:!0,style:{width:u,height:p}},a("style",null,':host{width:100%;display:block;--scope-border-color:var(--border-color,#d6d8d8);--scope-border-radius:var(--border-border-radius,5px)}:host([centered]) .showcase.-sandbox{align-items:center;justify-content:center}.showcase.-preview{width:100%;position:relative;overflow:hidden;border-radius:var(--scope-border-radius);border:1px solid var(--scope-border-color);height:calc(100% - 38px);box-sizing:border-box;border-top-left-radius:0}.showcase.-btn{min-height:100%;display:flex;padding:0 .8rem;align-items:center;transition:all .3s ease;color:currentColor}.showcase.-btn:hover{background:var(--scope-border-color)}.showcase.-btn svg path{fill:currentColor}.showcase.-header{border:1px solid var(--scope-border-color);border-bottom:none;border-radius:var(--scope-border-radius) var(--scope-border-radius) 0 0;display:inline-flex}.showcase.-header>*+*{border-left:1px solid var(--scope-border-color)}.showcase.-select{border:none;padding:10px;background:transparent;color:currentColor}.showcase.-select option{color:#000}.showcase.-sandbox{width:100%;height:100%;box-sizing:border-box;display:flex;flex-flow:row wrap;padding:1rem 30px 1rem 1rem;overflow-y:auto}.showcase.-resize{width:20px;height:100%;position:absolute;top:0;right:0;display:flex;align-items:center;justify-content:center;padding:0;border:none;background:transparent;cursor:col-resize;border-left:1px solid var(--scope-border-color)}.showcase.-resize:after,.showcase.-resize:before{content:"";display:block;width:1px;height:20px;background:var(--scope-border-color)}.showcase.-resize:after{margin-left:3px}'),j&&a("header",{ref:g,class:"showcase -header"},a("select",{class:"showcase -select",onchange:({target:{value:e}})=>y(e)},E.map(({label:e})=>a("option",{value:e},e))),b&&a("a",{class:"showcase -btn",href:b,target:"_blank"},a("svg",{height:"14",viewBox:"0 0 467.765 467.765",xmlns:"http://www.w3.org/2000/svg"},a("path",{d:"M146.175 87.707L0 233.883l146.175 146.175 41.34-41.34L82.681 233.883l104.834-104.836zM321.59 87.707l-41.34 41.34 104.834 104.836L280.25 338.717l41.34 41.34 146.175-146.175z"})))),a("section",{class:"showcase -preview",ref:w},a("div",{class:"showcase -sandbox",ref:f}),a("button",c({class:"showcase -resize"},k))))};u.props={width:{type:String},height:{type:String},src:{type:String},centered:{type:Boolean,reflect:!0},origin:String};var p=r("a-showcase",u);export default p;
//# sourceMappingURL=a-showcase.js.map
