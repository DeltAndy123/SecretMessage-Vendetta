(function(s,c,o,d,a,E){"use strict";const{FormText:x,FormRow:u,FormInput:b,FormSwitch:i}=d.Forms,{ScrollView:y}=o.ReactNative;function S(){return E.useProxy(a.storage),o.React.createElement(y,null,o.React.createElement(b,{title:"Key",value:a.storage.key??"default",onSubmitEditing:function(e){return a.storage.key=e.nativeEvent.text},placeholder:"Secret key to encrypt messages",returnKeyType:"done",secureTextEntry:!0}),o.React.createElement(u,{label:"Auto shorten text",subLabel:"Shorten encrypted text by replacing specific char. Can be detected by AutoMod.",trailing:o.React.createElement(i,{value:a.storage.shorten_text??!0,onValueChange:function(e){return a.storage.shorten_text=e}})}),o.React.createElement(u,{label:"Enable encryption",subLabel:"Messages that you send will be encrypted.",trailing:o.React.createElement(i,{value:a.storage.enable_encryption??!0,onValueChange:function(e){return a.storage.enable_encryption=e}})}),o.React.createElement(u,{label:"Debug Mode",subLabel:"Log debug messages to console.",trailing:o.React.createElement(i,{value:a.storage.debug??!1,onValueChange:function(e){return a.storage.debug=e}})}))}function f(e,t){let n="";for(let r=0;r<e.length;r++)n+=String.fromCharCode(e.charCodeAt(r)^t.charCodeAt(r%t.length));return n}function A(e){return`${f("secret",e).slice(0,3).padStart(3,"?")}`}function m(e){return`\`<${e.slice(0,2)}${"*".repeat(Math.max(e.length-2,0))}>\``}function $(e,t){const n=e.slice(0,t),r=e.slice(t+1);return`${n}${r}`}function p(e,t){let n=2;if(e.length<=9){if(e.slice(2,5)==t)return e.slice(5,-2)}else{let r=Math.floor((e.length-n*2-3)/3),l=`${e[r-1+(1-1)+n]}${e[r*2-1+(2-1)+n]}${e[r*3-1+(3-1)+n]}`;if(e=e.slice(2,-2),t==l)return[3,2,1].forEach(function(h){e=$(e,r*h-1+(h-1))}),e}return!1}function g(e){let t=a.storage.key,n=A(t),r=m(t),l=p(e,n);return l?`${f(C(l),t)} ${r}`:e}function C(e){return e.replaceAll("\u2004","\r").replaceAll("\u2001",`
`).replaceAll("\u2002","\v").replaceAll("\u2003","\f")}const M=[c.patcher.before("dispatch",c.metro.common.FluxDispatcher,function(e){let[t]=e;switch(t.type){case"MESSAGE_CREATE":return t.message.content=g(t.message.content),[t];case"MESSAGE_UPDATE":return t.message.content=g(t.message.content),[t];case"LOAD_MESSAGES_SUCCESS":return t.messages.forEach(function(n){n.content=g(n.content)}),[t];case"sendMessage":c.logger.info(t)}a.storage.debug&&c.logger.info(t)})];function R(){a.storage.debug&&c.logger.info("Unloading SecretMessage"),M.forEach(function(e){return e()})}const v=S;return s.onUnload=R,s.settings=v,s})({},vendetta,vendetta.metro.common,vendetta.ui.components,vendetta.plugin,vendetta.storage);
