import { storage } from "@vendetta/plugin";
import { EncryptionMethods } from "../types";
import { encryptMessage as encryptLegacy, decryptMessage as decryptLegacy } from "./legacy";
import { bulkReplace } from "../util";
import { AES, enc } from "crypto-js";
import NodeRSA from "node-rsa";

export function censorKey(key: string, hideLength?: boolean) {
  if (hideLength) {
    return `${key.slice(0, 2)}***`
  } else {
    return `${key.slice(0, 2)}${'*'.repeat(Math.max(key.length - 2, 0))}`
  }
}


export function encryptMessage(message: string, key: string, method: EncryptionMethods): string {
  switch (method) {
    case "legacy":
      return encryptLegacy(message, key, storage.settings.shorten_text);
    case "aes":
      return AES.encrypt(message, key).toString();
      // return message;
    case "rsa":
      return message;
  }
}

const decryptMessageOpts = {
  spoofKeyLength: true
}
export function decryptMessage(message: string, key: { legacy?: string, rsa?: string, aes?: string }, method: EncryptionMethods | EncryptionMethods[], options = decryptMessageOpts): string {
  options = Object.assign(decryptMessageOpts, options);
  if (!method.length) return message;
  if (Array.isArray(method)) {
    for (const m of method) {
      try {
        const decrypted = decryptMessage(message, key, m, options);
        if (decrypted !== message) return decrypted;
      } catch (e) {
        continue;
      }
    }
    return message;
  }
  
  switch (method) {
    case "legacy":
      const decryptedLegacy = decryptLegacy(message, key.legacy);
      if (!decryptedLegacy.wasEncrypted) return message;
      return decryptedLegacy.text + " " + bulkReplace(
        storage.settings.decrypted_message_suffix,
        {
          "{{METHOD}}": method,
          "{{KEY}}": censorKey(key.legacy, options.spoofKeyLength)
        }
      );
    case "aes":
      const decryptedAES = AES.decrypt(message, key.aes).toString(enc.Utf8);
      if (!decryptedAES) return message;
      return decryptedAES + " " + bulkReplace(
        storage.settings.decrypted_message_suffix,
        {
          "{{METHOD}}": method,
          "{{KEY}}": censorKey(key.aes, options.spoofKeyLength)
        }
      );
    case "rsa":
      return message;
  }
}