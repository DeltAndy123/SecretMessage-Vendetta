import { storage } from "@vendetta/plugin";
import { EncryptionMethods } from "../types";
import { encryptMessage as encryptLegacy, decryptMessage as decryptLegacy, censorKey } from "./legacy";
import { bulkReplace } from "../util";

export function encryptMessage(message: string, key: string, method: EncryptionMethods): string {
  switch (method) {
    case "legacy":
      return encryptLegacy(message, key, storage.settings.shorten_text);
    case "aes-128":
      return message;
    case "rsa":
      return message;
  }
}

export function decryptMessage(message: string, key: { legacy?: string, rsa?: string, aes128?: string }, method: EncryptionMethods | EncryptionMethods[], options = {
  spoofKeyLength: true,
}): string {
  if (Array.isArray(method)) {
    for (const m of method) {
      try {
        return decryptMessage(message, key, m);
      } catch (e) {
        continue;
      }
    }
    return
  }
  switch (method) {
    case "legacy":
      const decrypted = decryptLegacy(message, key.legacy);
      const censoredKey = censorKey(key.legacy, options.spoofKeyLength);
      if (!decrypted.wasEncrypted) return message;
      return bulkReplace(
        storage.settings.decrypted_message_template,
        {
          "{{MESSAGE}}": decrypted.text,
          "{{METHOD}}": method,
          "{{KEY}}": censoredKey,
        }
      )
    case "aes-128":
      throw new Error("Not implemented");
    case "rsa":
      throw new Error("Not implemented");
  }
}