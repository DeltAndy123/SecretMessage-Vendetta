(function(t,n,e,o,c){"use strict";const{FormText:m,FormRow:l}=o.Forms,{TextInput:s}=o.General,{ScrollView:u}=e.ReactNative;function i(){return e.React.createElement(u,null,e.React.createElement(l,{label:e.React.createElement(s,{value:c.storage.key,onSubmitEditing:function(r){return c.storage.key=r.nativeEvent.text},placeholder:"Secret key to encrypt messages",returnKeyType:"done",secureTextEntry:!0})}))}n.patcher.before("dispatch",n.metro.common.FluxDispatcher,function(r){let[a]=r;if(a.type=="MESSAGE_CREATE")return a.message.content="test (hopefully it works)",[a]});function g(){n.logger.log("SecretMessage unloaded")}const d=i;return t.onUnload=g,t.settings=d,t})({},vendetta,vendetta.metro.common,vendetta.ui.components,vendetta.plugin);
