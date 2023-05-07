import { logger, metro, patcher } from "@vendetta";
import { storage } from "@vendetta/plugin";
import { encryptMessage, decryptMessage, censorKey } from "./util/encryption";
import { findByProps } from "@vendetta/metro";
import { registerCommand } from "@vendetta/commands";
import { generateSettingsPage, setDefaults } from "./util/settings";
import settingsJson from "./settings";
import { getSuffixRegex } from "./util/encryption/legacy";
import { bulkReplace } from "./util/util";

enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
  MENTIONABLE,
  NUMBER,
  ATTACHMENT,
}

enum ApplicationCommandInputType {
  BUILT_IN,
  BUILT_IN_TEXT,
  BUILT_IN_INTEGRATION,
  BOT,
  PLACEHOLDER,
}

enum ApplicationCommandType {
  CHAT = 1,
  USER,
  MESSAGE,
}

if (!storage.settings) storage.settings = setDefaults({}, settingsJson);

const Messages = findByProps("sendMessage", "receiveMessage");

const patches = [
  patcher.before("dispatch", metro.common.FluxDispatcher, ([e]) => {
    if (!storage.settings) return;
    if (!storage.settings.enable_decryption) return;
    switch (e.type) {
      // Decrypt received messages
      case "MESSAGE_CREATE":
        if (!e.message.content) return;
        e.message.content = decryptMessage(
          e.message.content,
          {
            legacy: storage.settings.legacy_key,
            rsa: storage.settings.rsa_private,
            aes: storage.settings.aes_key,
          },
          storage.settings.decryption_methods,
          {
            spoofKeyLength: storage.settings.spoof_key_length,
          }
        );
        break;
      case "MESSAGE_UPDATE":
        if (!e.message.content) return;
        e.message.content = decryptMessage(
          e.message.content,
          {
            legacy: storage.settings.legacy_key,
            rsa: storage.settings.rsa_private,
            aes: storage.settings.aes_key,
          },
          storage.settings.decryption_methods,
          {
            spoofKeyLength: storage.settings.spoof_key_length,
          }
        );
        break;
      case "LOAD_MESSAGES_SUCCESS":
        e.messages.forEach((m: { content: string }) => {
          if (!m.content) return;
          m.content = decryptMessage(
            m.content,
            {
              legacy: storage.settings.legacy_key,
              rsa: storage.settings.rsa_private,
              aes: storage.settings.aes_key,
            },
            storage.settings.decryption_methods,
            {
              spoofKeyLength: storage.settings.spoof_key_length,
            }
          );
        });
        break;
    }
    if (storage.settings.debug) logger.info(e);
  }),

  // Encrypt sent messages
  patcher.before("sendMessage", Messages, ([, msg]) => {
    if (storage.settings.enable_encryption) {
      switch (storage.settings.encryption_method) {
        case "legacy":
          msg.content = encryptMessage(
            msg.content,
            storage.settings.legacy_key,
            "legacy"
          );
          break;
        case "rsa":
          msg.content = encryptMessage(
            msg.content,
            storage.settings.rsa_public,
            "rsa"
          );
          break;
        case "aes":
          msg.content = encryptMessage(
            msg.content,
            storage.settings.aes_key,
            "aes"
          );
          break;
      }
    }
  }),
  patcher.before("editMessage", Messages, ([, , msg]) => {
    if (storage.settings.enable_encryption) {
      switch (storage.settings.encryption_method) {
        case "legacy":
          msg.content = encryptMessage(
            msg.content,
            storage.settings.legacy_key,
            "legacy"
          );
          break;
        case "rsa":
          msg.content = encryptMessage(
            msg.content,
            storage.settings.rsa_public,
            "rsa"
          );
          break;
        case "aes":
          msg.content = encryptMessage(
            msg.content,
            storage.settings.aes_key,
            "aes"
          );
          break;
      }
    }
  }),
  patcher.before("startEditMessage", Messages, (args) => {
    // Remove suffix from message content when editing
    const suffix = bulkReplace(storage.settings.decrypted_message_suffix, {
      "{{METHOD}}": storage.settings.encryption_method,
      "{{KEY}}": censorKey(
        storage.settings.encryption_method === "legacy"
          ? storage.settings.legacy_key
          : storage.settings.encryption_method === "rsa"
          ? storage.settings.rsa_public
          : storage.settings.aes_key,
        storage.settings.spoof_key_length
      ),
    });
    args[2] = args[2].replace(` ${suffix}`, "");
  }),

  // // Slash commands
  // registerCommand({
  //   name: "togglesecretmessage",
  //   displayName: "togglesecretmessage",
  //   description: "Toggle SecretMessage",
  //   displayDescription: "Toggle SecretMessage",
  //   options: [
  //     {
  //       name: "enable",
  //       displayName: "enable",
  //       description: "Enable SecretMessage (If not specified, it will be toggled)",
  //       displayDescription: "Enable SecretMessage (If not specified, it will be toggled)",
  //       type: ApplicationCommandOptionType.BOOLEAN as number,
  //       required: false,
  //     }
  //   ],
  //   applicationId: "",
  //   inputType: ApplicationCommandInputType.BUILT_IN_TEXT as number,
  //   type: ApplicationCommandType.CHAT as number,

  //   execute: (args, ctx) => {
  //     if (args[0].value) {
  //       storage.settings.enable_encryption = true;
  //       toasts.showToast("Encrypting messages enabled");
  //     } else if (args[0].value === false) {
  //       storage.settings.enable_encryption = false;
  //       toasts.showToast("Encrypting messages disabled");
  //     } else {
  //       storage.settings.enable_encryption = !storage.settings.enable_encryption;
  //       toasts.showToast(`Encrypting messages ${storage.settings.enable_encryption ? "enabled" : "disabled"}`);
  //     }
  //   }
  // })
];

export function onUnload() {
  if (storage.settings.debug) logger.info("Unloading SecretMessage");
  patches.forEach((unload) => unload());
}

export const settings = () => generateSettingsPage(settingsJson, storage);