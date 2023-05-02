import { logger, metro, patcher } from "@vendetta";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";
import { decryptMessage } from "./util/encrypt";
import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

const Messages = findByProps("sendMessage", "recieveMessage");

const unload = [
  patcher.before("dispatch", metro.common.FluxDispatcher, ([e]) => {
    switch (e.type) {
      // Decrypt received messages
      case "MESSAGE_CREATE":
        e.message.content = decryptMessage(e.message.content);
        return [e];
      case "MESSAGE_UPDATE":
        e.message.content = decryptMessage(e.message.content);
        return [e];
      case "LOAD_MESSAGES_SUCCESS":
        e.messages.forEach((m) => {
          m.content = decryptMessage(m.content);
        });
        return [e];
    }
    if (storage.debug) logger.info(e);
  }),
  // Encrypt sent messages
  before("sendMessage", Messages, (args) => {
    console.log("test")
  }),
];

export function onUnload() {
  if (storage.debug) logger.info("Unloading SecretMessage");
  unload.forEach((u) => u());
}
export const settings = Settings;
