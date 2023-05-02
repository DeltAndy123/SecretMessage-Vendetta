(function(s,o,c,d,a){"use strict";const{FormText:v,FormRow:i,FormInput:E,FormSwitch:g}=d.Forms,{ScrollView:b}=c.ReactNative;function S(){return c.React.createElement(b,null,c.React.createElement(E,{title:"Key",value:a.storage.key||"default",onSubmitEditing:function(e){return a.storage.key=e.nativeEvent.text},placeholder:"Secret key to encrypt messages",returnKeyType:"done",secureTextEntry:!0}),c.React.createElement(i,{label:"Auto shorten text",subLabel:"Shorten encrypted text by replacing specific char. Can be detected by AutoMod.",trailing:c.React.createElement(g,{value:a.storage.shorten_text,onValueChange:function(e){return a.storage.shorten_text=e}})}),c.React.createElement(i,{label:"Debug Mode",subLabel:"Log debug messages to console.",trailing:c.React.createElement(g,{value:a.storage.debug,onValueChange:function(e){return a.storage.debug=e}})}))}function f(e,t){let n="";for(let r=0;r<e.length;r++)n+=String.fromCharCode(e.charCodeAt(r)^t.charCodeAt(r%t.length));return n}function m(e){return`${f("secret",e).slice(0,3).padStart(3,"?")}`}function A(e){return`\`<${e.slice(0,2)}${"*".repeat(Math.max(e.length-2,0))}>\``}function y(e,t){const n=e.slice(0,t),r=e.slice(t+1);return`${n}${r}`}function $(e,t){let n=2;if(e.length<=9){if(e.slice(2,5)==t)return e.slice(5,-2)}else{let r=Math.floor((e.length-n*2-3)/3),l=`${e[r-1+(1-1)+n]}${e[r*2-1+(2-1)+n]}${e[r*3-1+(3-1)+n]}`;if(e=e.slice(2,-2),t==l)return[3,2,1].forEach(function(h){e=y(e,r*h-1+(h-1))}),e}return!1}function u(e){let t=a.storage.key,n=m(t),r=A(t),l=$(e,n);return l?`${f(p(l),t)} ${r}`:e}function p(e){return e.replaceAll("\u2004","\r").replaceAll("\u2001",`
`).replaceAll("\u2002","\v").replaceAll("\u2003","\f")}const C=[o.patcher.before("dispatch",o.metro.common.FluxDispatcher,function(e){let[t]=e;switch(t.type){case"MESSAGE_CREATE":return t.message.content=u(t.message.content),[t];case"MESSAGE_UPDATE":return t.message.content=u(t.message.content),[t];case"LOAD_MESSAGES_SUCCESS":return t.messages.forEach(function(n){n.content=u(n.content)}),[t]}a.storage.debug&&o.logger.info(t)})];function M(){a.storage.debug&&o.logger.info("Unloading SecretMessage"),C.forEach(function(e){return e()})}const R=S;return s.onUnload=M,s.settings=R,s})({},vendetta,vendetta.metro.common,vendetta.ui.components,vendetta.plugin);
