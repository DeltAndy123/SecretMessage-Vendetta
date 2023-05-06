import { showToast } from "@vendetta/ui/toasts"
import { MenuOption, SettingsComponent } from "./util/types"

const encryptionMethods: MenuOption[] = [
  {
    label: "Legacy",
    description: "The legacy encryption method used by SecretMessage (both Enmity and Vendetta), backwards compatible (NOTE: VERY INSECURE AND NOT RECOMMENDED)",
    value: "legacy"
  },
  {
    label: "RSA",
    description: "Uses a public key to encrypt messages and a private key to decrypt them",
    value: "rsa"
  },
  {
    label: "AES-128",
    description: "Military-grade encryption using 128-bit keys to encrypt and decrypt messages",
    value: "aes-128"
  }
]


export default [
  {
    type: "group",
    title: "General",
    components: [
      {
        type: "switch",
        label: "Enable encryption",
        description: "Messages that you send will be encrypted in your selected method.",
        key: "enable_encryption"
      },
      {
        type: "switch",
        label: "Enable decryption",
        description: "Messages that you receive will be decrypted in your selected method.",
        key: "enable_decryption",
        default: true
      },
      {
        type: "input",
        label: "Decrypted message template",
        description: "The template used to display decrypted messages.",
        key: "decrypted_message_template",
        default: "{{MESSAGE}} [{{METHOD}} ({{KEY}})]"
      }
    ],
    description: "Valid placeholders: {{MESSAGE}}, {{METHOD}}, {{KEY}} (KEY will be censored)"
  },
  {
    type: "radio",
    label: "Encryption Method",
    description: "Method used to encrypt messages",
    key: "encryption_method",
    choices: encryptionMethods
  },
  {
    type: "checklist",
    label: "Decryption methods",
    description: "Methods used to decrypt messages automatically",
    key: "decryption_methods",
    choices: encryptionMethods
  },
  {
    type: "group",
    title: "RSA",
    components: [
      {
        type: "input",
        label: "Private key",
        description: "The private key to decrypt messages using RSA",
        key: "rsa_private",
        protected: true
      },
      {
        type: "input",
        label: "Public key",
        description: "The public key to encrypt messages using RSA",
        key: "rsa_public",
      },
      {
        type: "button",
        label: "Generate public key",
        description: "Generate and copy a public key to encrypt messages that can be decrypted using your private key",
        onclick: () => {
          showToast("Not implemented yet")
        }
      },
      {
        type: "button",
        label: "Generate key pair",
        description: "Generate a new key pair (public and private key) to encrypt and decrypt messages and fill the fields above",
        onclick: () => {
          showToast("Not implemented yet")
        }
      }
    ]
  },
  {
    type: "group",
    title: "AES",
    components: [
      {
        type: "input",
        label: "AES Key",
        description: "The key to encrypt and decrypt messages using AES",
        key: "aes_key",
        protected: true
      }
    ]
  },
  {
    type: "group",
    title: "Legacy",
    components: [
      {
        type: "input",
        label: "Legacy Key",
        description: "The key to encrypt and decrypt messages using the legacy method",
        key: "legacy_key",
        protected: true
      },
      {
        type: "switch",
        label: "Auto shorten text",
        description: "Shorten encrypted text by replacing specific char. Can be detected by AutoMod.",
        key: "shorten_text",
        default: true
      },
      {
        type: "switch",
        label: "Spoof key length",
        description: "Always make the key length shown as 5 characters long when decrypted messages are shown. (Example: if key is 123456789, it will be shown as 12*** instead of 12*******)",
        key: "spoof_key_length",
        default: true
      }
    ]
  }
] as SettingsComponent[]