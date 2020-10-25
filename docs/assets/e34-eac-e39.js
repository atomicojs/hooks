import{u as b,a as x,c as _,h as l}from"./c-7baeca6f.js";function k(e){let s=[0,0,0],t=e.length;for(;t--;)s[0]+=p(e[t-1]),s[1]+=p(e[t]),s[2]+=p(e[t+1]);return s.map(n=>n.toString(16)).join("-")}const p=e=>e?e.charCodeAt():0;function w(e){return e=j(`:host{${e}}`,[/\s+/g," "],[/\/\*.+?\*\//g,""],[/\"/g,"'"],[/:([^;}]+)}/g,":$1;}"],[/ *([^;{}]+) *{/g,'"$1":{'],[/{[^{}]+}/g,h],[/{([^"]+)/g,h],[/}"/g,'},"'],[/, *}/g,"}"]),JSON.parse(`{${e}}`)}const h=e=>e.replace(/([\w-]+) *: *([^;]+);/g,'"$1":"$2",'),j=(e,...s)=>s.reduce((t,n)=>t.replace(...n),e),u=(e,s,t,n)=>e[n?"unshift":"push"](s+`{${t}}`);function d(e,s="",t=[]){let n="";for(const o in e){const c=e[o],r=o.trim();if(typeof c=="object")if(r[0]=="@"){const[a,i]=d(c,s||r);u(a,s,i),u(t,r,a.join(""))}else{const a=(s||"")+(r[0]=="&"?r.slice(1):(s?" ":"")+r),[,i]=d(c,a,t);u(t,a,i,!0)}else n+=r+":"+c+";"}return[t,n]}function $(e){const[s]=d(w(e));return s}let E=0;const g={},S=()=>({id:E++,task:{},ref:{}}),y=e=>g[e]=g[e]||{id:k(e),rules:$(e)};function C(){const[e]=b(S),s=(t,...n)=>{const{task:o,id:c}=e,r=typeof t=="string"?t:t.map((a,i)=>a+(n[i]||"")).join("");return o[r]||(o[r]={...y(r)},o[r].id="c"+c+o[r].id),o[r].id};return x(()=>{const{ref:t,task:n}=e,{current:o}=t;for(const c in n){const{id:r,rules:a,print:i}=n[c];i||(n[c].print=!0,a.map(f=>{const m=f.replace(/:host/g,"."+r).replace(/host_/g,r);o.sheet.insertRule(m,o.sheet.rules.length)}))}}),s.ref=e.ref,s}function R(){const e=C();return l("host",{class:e`
        width: 200px;
        height: 200px;
        background: #000;
        display: block;
        &:hover {
          background: red;
          border-radius: 50%;
        }
        button {
          width: 200px;
          &:hover {
            background: gold;
          }
        }
        @media (max-width: 500px) {
          height: 500px;
        }
      `},l("style",{ref:e.ref}),l("button",{class:e`
          background: #000;
        `},"1"),l("button",null,"2"),l("button",null,"3"))}customElements.define("example-use-css",_(R));
