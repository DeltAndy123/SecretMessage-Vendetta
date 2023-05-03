(function(y,l,r,_,s,v,d,o,I,L){"use strict";const T=[{label:"Legacy",description:"The legacy encryption method used by SecretMessage (both Enmity and Vendetta), backwards compatible",value:"legacy"},{label:"RSA",description:"Uses a public key to encrypt messages and a private key to decrypt them",value:"rsa"},{label:"AES-128",description:"Military-grade encryption using 128-bit keys to encrypt and decrypt messages",value:"aes-128"}];var $=[{type:"switch",label:"Enable encryption",description:"Messages that you send will be encrypted in your selected method.",key:"enable_encryption"},{type:"radio",label:"Encryption Method",description:"Method used to encrypt messages",key:"encryption_method",choices:T},{type:"checklist",label:"Decryption methods",description:"Methods used to decrypt messages automatically",key:"decryption_methods",choices:T},{type:"page",label:"RSA",description:"Configuration for RSA encryption and decryption",components:[{type:"input",label:"Private key",description:"The private key to decrypt messages using RSA",key:"rsa_private",multiLine:!0,lines:4,protected:!0},{type:"input",label:"Public key",description:"The public key to encrypt messages using RSA",key:"rsa_public",multiLine:!0,lines:3},{type:"button",label:"Generate public key",decription:"Generate a public key to encrypt messages that can be decrypted using your private key",onclick:function(){}}]},{type:"input",label:"AES Key",description:"The key to encrypt and decrypt messages using AES",key:"aes_key",protected:!0}];const{FormRow:c,FormInput:B,FormSwitch:C}=_.Forms,{ScrollView:M}=r.ReactNative,g=r.NavigationNative.useNavigation();function N(e,n){return e.map(function(t){switch(t.type){case"switch":return r.React.createElement(c,{label:t.label,subLabel:t.description,trailing:r.React.createElement(C,{value:n[t.key]??t.default,onValueChange:function(a){return n[t.key]=a}})});case"radio":return r.React.createElement(c,{label:t.label,subLabel:t.description,trailing:r.React.createElement(c.Arrow,null),onPress:function(){return g.push("VendettaCustomPage",{title:t.label,render:function(){return r.React.createElement(M,null,t.choices.map(function(a){return r.React.createElement(c,{label:a.label,subLabel:a.description,leading:r.React.createElement(c.Icon,{source:n[t.key]===a.value?d.getAssetIDByName("ic_radio_circle_checked"):d.getAssetIDByName("ic_radio_circle")}),onPress:function(){n[t.key]=a.value,o.toasts.showToast("Settings saved!")}})}))}})}});case"checklist":return r.React.createElement(c,{label:t.label,subLabel:t.description,trailing:r.React.createElement(c.Arrow,null),onPress:function(){return g.push("VendettaCustomPage",{title:t.label,render:function(){return r.React.createElement(M,null,t.choices.map(function(a){return r.React.createElement(c,{label:a.label,subLabel:a.description,leading:r.React.createElement(c.Icon,{source:n[t.key].includes(a.value)?d.getAssetIDByName("ic_radio_square_checked_24px"):d.getAssetIDByName("ic_radio_square_24px")}),onPress:function(){n[t.key].includes(a.value)?n[t.key]=n[t.key].filter(function(i){return i!==a.value}):n[t.key].push(a.value),o.toasts.showToast("Settings saved!")}})}))}})}});case"input":return r.React.createElement(B,{title:t.label,value:n[t.key]??t.default,onSubmitEditing:function(a){return n[t.key]=a.nativeEvent.text},placeholder:t.description,returnKeyType:"done",secureTextEntry:t.secure,multiline:t.lines>1,numberOfLines:t.lines||1});case"button":return r.React.createElement(c,{label:t.label,subLabel:t.description,onPress:function(){t.onclick()}});case"page":return r.React.createElement(c,{label:t.label,subLabel:t.description,trailing:r.React.createElement(c.Arrow,null),onPress:function(){return g.push("VendettaCustomPage",{title:t.label,render:function(){return N(t.components,n)}})}});default:return null}})}function U(){return v.useProxy(s.storage),N($,s.storage)}let S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";function b(e,n){let t="";for(let a=0;a<e.length;a++)t+=String.fromCharCode(e.charCodeAt(a)^n.charCodeAt(a%n.length));return t}function k(e){return`${b("secret",e).slice(0,3).padStart(3,"?")}`}function O(e){return`\`<${e.slice(0,2)}${"*".repeat(Math.max(e.length-2,0))}>\``}function w(e){return new RegExp(` \`<${e.slice(0,2)}${"\\*".repeat(Math.max(e.length-2,0))}>\`$`)}function P(e,n,t){const a=e.slice(0,n),i=e.slice(n);return`${a}${t}${i}`}function D(e,n){const t=e.slice(0,n),a=e.slice(n+1);return`${t}${a}`}function G(e,n){return e=Math.ceil(e),n=Math.floor(n),Math.floor(Math.random()*(n-e+1))+e}function p(){return S[G(0,S.length-1)]}function R(e){let n=s.storage.key,t=V(b(e,n)),a=Math.floor(t.length/3),i=k(n);return a==0?t=`${i}${t}`:[3,2,1].forEach(function(u){t=P(t,a*u-1,i[u-1])}),`${p()}${p()}${t}${p()}${p()}`}function x(e,n){let t=2;if(e.length<=9){if(e.slice(2,5)==n)return e.slice(5,-2)}else{let a=Math.floor((e.length-t*2-3)/3),i=`${e[a-1+(1-1)+t]}${e[a*2-1+(2-1)+t]}${e[a*3-1+(3-1)+t]}`;if(e=e.slice(2,-2),n==i)return[3,2,1].forEach(function(u){e=D(e,a*u-1+(u-1))}),e}return!1}function E(e){let n=s.storage.key,t=k(n),a=O(n),i=x(e,t);return i?`${b(H(i),n)} ${a}`:e}function H(e){return e.replaceAll("\u2004","\r").replaceAll("\u2001",`
`).replaceAll("\u2002","\v").replaceAll("\u2003","\f")}function V(e){return s.storage.shorten_text?e.replaceAll("\v","\u2002").replaceAll("\f","\u2003").replaceAll("\r","\u2004").replaceAll(`
`,"\u2001"):e}var f;(function(e){e[e.SUB_COMMAND=1]="SUB_COMMAND",e[e.SUB_COMMAND_GROUP=2]="SUB_COMMAND_GROUP",e[e.STRING=3]="STRING",e[e.INTEGER=4]="INTEGER",e[e.BOOLEAN=5]="BOOLEAN",e[e.USER6=6]="USER6",e[e.CHANNEL=7]="CHANNEL",e[e.ROLE=8]="ROLE",e[e.MENTIONABLE=9]="MENTIONABLE",e[e.NUMBER=10]="NUMBER",e[e.ATTACHMENT=11]="ATTACHMENT"})(f||(f={}));var h;(function(e){e[e.BUILT_IN=0]="BUILT_IN",e[e.BUILT_IN_TEXT=1]="BUILT_IN_TEXT",e[e.BUILT_IN_INTEGRATION=2]="BUILT_IN_INTEGRATION",e[e.BOT=3]="BOT",e[e.PLACEHOLDER=4]="PLACEHOLDER"})(h||(h={}));var A;(function(e){e[e.CHAT=1]="CHAT",e[e.USER=2]="USER",e[e.MESSAGE=3]="MESSAGE"})(A||(A={}));const m=I.findByProps("sendMessage","receiveMessage"),F=[l.patcher.before("dispatch",l.metro.common.FluxDispatcher,function(e){let[n]=e;switch(n.type){case"MESSAGE_CREATE":n.message.content=E(n.message.content);break;case"MESSAGE_UPDATE":n.message.content=E(n.message.content);break;case"LOAD_MESSAGES_SUCCESS":n.messages.forEach(function(t){t.content=E(t.content)});break}s.storage.debug&&l.logger.info(n)}),l.patcher.before("sendMessage",m,function(e){let[,n]=e;s.storage.enable_encryption&&(n.content=R(n.content))}),l.patcher.before("editMessage",m,function(e){let[,n]=e;s.storage.enable_encryption&&(n.content=R(n.content))}),l.patcher.before("startEditMessage",m,function(e){let[,,n]=e;n=n.replace(w(s.storage.key),"")}),L.registerCommand({name:"togglesecretmessage",displayName:"togglesecretmessage",description:"Toggle SecretMessage",displayDescription:"Toggle SecretMessage",options:[{name:"enable",displayName:"enable",description:"Enable SecretMessage (If not specified, it will be toggled)",displayDescription:"Enable SecretMessage (If not specified, it will be toggled)",type:f.BOOLEAN,required:!1}],applicationId:"",inputType:h.BUILT_IN_TEXT,type:A.CHAT,execute:function(e,n){e[0].value?(s.storage.enable_encryption=!0,o.toasts.showToast("Encrypting messages enabled")):e[0].value===!1?(s.storage.enable_encryption=!1,o.toasts.showToast("Encrypting messages disabled")):(s.storage.enable_encryption=!s.storage.enable_encryption,o.toasts.showToast(`Encrypting messages ${s.storage.enable_encryption?"enabled":"disabled"}`))}})];function q(){s.storage.debug&&l.logger.info("Unloading SecretMessage"),F.forEach(function(e){return e()})}const X=U;return y.onUnload=q,y.settings=X,y})({},vendetta,vendetta.metro.common,vendetta.ui.components,vendetta.plugin,vendetta.storage,vendetta.ui.assets,vendetta.ui,vendetta.metro,vendetta.commands);
