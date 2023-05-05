import { logger, metro, patcher } from "@vendetta";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";
import { decryptMessage, encryptMessage, getSuffixRegex } from "./util/encrypt";
import { findByProps } from "@vendetta/metro";
import { registerCommand } from "@vendetta/commands";
import { toasts } from "@vendetta/ui";

enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER6,
  CHANNEL,
  ROLE,
  MENTIONABLE,
  NUMBER,
  ATTACHMENT
}

enum ApplicationCommandInputType {
  BUILT_IN,
  BUILT_IN_TEXT,
  BUILT_IN_INTEGRATION,
  BOT,
  PLACEHOLDER
}

enum ApplicationCommandType {
  CHAT = 1,
  USER,
  MESSAGE
}

const Messages = findByProps("sendMessage", "receiveMessage");

const unload = [
  patcher.before("dispatch", metro.common.FluxDispatcher, ([e]) => {
    switch (e.type) {
      // Decrypt received messages
      case "MESSAGE_CREATE":
        if (!e.message.content) return;
        e.message.content = decryptMessage(e.message.content);
      break;
      case "MESSAGE_UPDATE":
        if (!e.message.content) return;
        e.message.content = decryptMessage(e.message.content);
      break;
      case "LOAD_MESSAGES_SUCCESS":
        e.messages.forEach((m) => {
          if (!e.message.content) return;
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
        type: ApplicationCommandOptionType.BOOLEAN as number,
        required: false,
      }
    ],
    applicationId: "",
    inputType: ApplicationCommandInputType.BUILT_IN_TEXT as number,
    type: ApplicationCommandType.CHAT as number,

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