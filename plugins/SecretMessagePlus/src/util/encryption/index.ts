import { EncryptionMethods } from "../types";
import { encryptMessage as encryptLegacy, decryptMessage as decryptLegacy } from "./legacy";

export function encryptMessage(message: string, key: string, method: EncryptionMethods): string {
  throw new Error("Not implemented");
}

export function decryptMessage(message: string, key: string, method: EncryptionMethods | EncryptionMethods[]): string {
  if (Array.isArray(method)) {
    for (const m of method) {
      try {
        return decryptMessage(message, key, m);
      } catch (e) {
        continue;
      }
    }
    throw new Error("Failed to decrypt message");
  }
  switch (method) {
    case "legacy":
      return decryptLegacy(message, key);
    case "aes-128":
      throw new Error("Not implemented");
    case "rsa":
      throw new Error("Not implemented");
  }
}