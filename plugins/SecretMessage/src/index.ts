import { logger, metro, patcher } from "@vendetta";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";
import { decryptMessage, encryptMessage, getSuffix } from "./util/encrypt";
import { findByProps } from "@vendetta/metro";

const Messages = findByProps("sendMessage", "receiveMessage");

const unload = [
  patcher.before("dispatch", metro.common.FluxDispatcher, ([e]) => {
    switch (e.type) {
      // Decrypt received messages
      case "MESSAGE_CREATE":
        e.message.content = decryptMessage(e.message.content);
      break;
      case "MESSAGE_UPDATE":
        e.message.content = decryptMessage(e.message.content);
      break;
      case "LOAD_MESSAGES_SUCCESS":
        e.messages.forEach((m) => {
          m.content = decryptMessage(m.content);
        });
      break;
    }
    if (storage.debug) logger.info(e);
  }),
  // Encrypt sent messages
  patcher.before("sendMessage", Messages, ([,msg]) => {
    if (storage.enable_encryption) {
      msg.content = encryptMessage(msg.content);
    }
  }),
  patcher.before("editMessage", Messages, ([,msg]) => {
    if (storage.enable_encryption) {
      msg.content = encryptMessage(msg.content);
    }
  }),
  patcher.before("startEditMessage", Messages, (args) => {
    if (storage.enable_encryption) {
      // Remove suffix (<key**>) from message when editing
      // content = content.replace(getSuffixRegex(storage.key), "");
      console.log(args);
    }
  }),
];

export function onUnload() {
  if (storage.debug) logger.info("Unloading SecretMessage");
  unload.forEach((u) => u());
}
export const settings = Settings;
function getSuffixRegex(key: any): any {
  throw new Error("Function not implemented.");
}

