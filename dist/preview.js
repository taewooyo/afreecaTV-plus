(()=>{function e(e,t,r,n,o,i,l){try{var u=e[i](l),c=u.value}catch(e){return void r(e)}u.done?t(c):Promise.resolve(c).then(n,o)}function t(t){return function(){var r=this,n=arguments;return new Promise((function(o,i){var l=t.apply(r,n);function u(t){e(l,o,i,u,c,"next",t)}function c(t){e(l,o,i,u,c,"throw",t)}u(void 0)}))}}function r(e,t){var r,n,o,i,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;l;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,n=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(!((o=(o=l.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){l=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){l.label=i[1];break}if(6===i[0]&&l.label<o[1]){l.label=o[1],o=i;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(i);break}o[2]&&l.ops.pop(),l.trys.pop();continue}i=t.call(e,l)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}setTimeout((function(){var e=document.getElementById("listMain"),n=[];if(e){var o,i=(o=t((function(){var o,i;return r(this,(function(u){switch(u.label){case 0:return o=function(){var e=t((function(e){var t;return r(this,(function(r){if(null==(t=e.querySelector(".prefer_bj")))return[2];try{console.log(t),l(t)}catch(e){}return[2]}))}));return function(t){return e.apply(this,arguments)}}(),[4,(c="#wrap",a=e.querySelector(c),a?Promise.resolve(a):Promise.race([new Promise((function(e){n.push({query:c,resolve:e})})),new Promise((function(e){setTimeout(e,1e4)}))]))];case 1:return null==(i=u.sent())?[2]:[4,o(i)];case 2:return u.sent(),[2]}var c,a}))})),function(){return o.apply(this,arguments)}),l=function(t){if(null!=t){var r=document.getElementById("bj_stat_title");if(r){var n=r.parentElement;if(n){var o=document.querySelectorAll("li.live"),i=[];o.forEach((function(e,t){var r=e.querySelector("a");if(null!=r){var n=r.href,o=n.lastIndexOf("/"),l=n.slice(o+1);i.push(l)}})),o.forEach((function(t){t.addEventListener("mouseout",(function(t){var r=e.querySelectorAll(".prefer-preview"),n=document.getElementById("wrap");null==r||r.forEach((function(e,t){null==n||n.removeChild(e)}))}))})),new MutationObserver((function(t){t.forEach((function(t){t.addedNodes.forEach((function(t){var r,n=null===(r=t.parentElement)||void 0===r?void 0:r.parentElement;if(n){var o=Number(null==n?void 0:n.clientHeight)+10,l=n.style.cssText.split("; ")[0],u=Number(l.slice(5,l.length-3));if(0!=u){var c=e.querySelectorAll(".prefer-preview"),a=document.getElementById("wrap");null==c||c.forEach((function(e,t){null==a||a.removeChild(e)})),document.querySelectorAll(":hover").forEach((function(e,t){if("A"==e.tagName){var r=e,l=r.href;i.forEach((function(e,t){if(-1!=l.indexOf(e)){var i=r.outerHTML.split(";"),c=i[0].indexOf("Log"),a=i[0].slice(c).split(", ")[1].slice(0),f=document.createElement("div");f.className="prefer-preview",f.style.position="fixed",f.style.left="236px",f.style.top=String(u+o)+"px",f.style.zIndex="999";var s=document.createElement("img");return s.src="https://liveimg.afreecatv.com/m/"+a,s.style.border="1px solid #d9d9d9",s.style.borderRadius="6px",f.appendChild(s),void n.before(f)}}))}}))}}}))}))})).observe(n,{childList:!0,subtree:!0})}}}};t((function(){return r(this,(function(e){return console.log("123"),i(),[2]}))}))()}}),300)})();