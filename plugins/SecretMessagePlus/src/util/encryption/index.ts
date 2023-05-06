import { EncryptionMethods } from "../types";
import { encryptMessage as encryptLegacy, decryptMessage as decryptLegacy } from "./legacy";

export function encryptMessage(message: string, key: { legacy?: string, rsa?: string, aes128?: string }, method: EncryptionMethods): string {
  throw new Error("Not implemented");
}

export function decryptMessage(message: string, key: { legacy?: string, rsa?: string, aes128?: string }, method: EncryptionMethods | EncryptionMethods[]): string {
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
      return decryptLegacy(message, key.legacy);
    case "aes-128":
      throw new Error("Not implemented");
    case "rsa":
      throw new Error("Not implemented");
  }
}