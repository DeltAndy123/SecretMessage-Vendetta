import { logger, metro, patcher } from "@vendetta";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";
import { decryptMessage, encryptMessage, getSuffixRegex } from "./util/encrypt";
import { findByDisplayName, findByProps } from "@vendetta/metro";
import { registerCommand } from "@vendetta/commands";
import { toasts } from "@vendetta/ui";

const Messages = findByProps("sendMessage", "receiveMessage");
const Pressable = findByDisplayName("Pressable");

let giftButtonID = null

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
  patcher.before("startEditMessage", Messages, ([,,content]) => {
    // Remove suffix (<key**>) from message when editing
    // TODO: Fix not replacing the message starting to edit
    content = content.replace(getSuffixRegex(storage.key), "");
  }),

  // Slash commands
  registerCommand({
    name: "togglesecretmessage",
    displayName: "togglesecretmessage",
    description: "Toggle SecretMessage",
    displayDescription: "Toggle SecretMessage",
    options: [
      {
        name: "enable",
        displayName: "enable",
        description: "Enable SecretMessage (If not specified, it will be toggled)",
        displayDescription: "Enable SecretMessage (If not specified, it will be toggled)",
        type: ApplicationCommandOptionType.BOOLEAN,
        required: false,
      }
    ],
    applicationId: "",
    inputType: ApplicationCommandInputType.BUILT_IN_TEXT,
    type: ApplicationCommandType.CHAT,

    execute: (args, ctx) => {
      if (args[0].value) {
        storage.enable_encryption = true;
        toasts.showToast("Encrypting messages enabled");
      } else if (args[0].value === false) {
        storage.enable_encryption = false;
        toasts.showToast("Encrypting messages disabled");
      } else {
        storage.enable_encryption = !storage.enable_encryption;
        toasts.showToast(`Encrypting messages ${storage.enable_encryption ? "enabled" : "disabled"}`);
      }
    }
  })
];

export function onUnload() {
  if (storage.debug) logger.info("Unloading SecretMessage");
  unload.forEach((u) => u());
}
export const settings = Settings;