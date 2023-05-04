import { MenuOption, SettingsComponent } from "./util/types"

const encryptionMethods: MenuOption[] = [
  {
    label: "Legacy",
    description: "The legacy encryption method used by SecretMessage (both Enmity and Vendetta), backwards compatible",
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
    type: "title",
    label: "SecretMessagePlus",
    description: "A plugin to encrypt your messages in many ways",
  },
  {
    type: "switch",
    label: "Enable encryption",
    description: "Messages that you send will be encrypted in your selected method.",
    key: "enable_encryption"
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
    type: "page",
    label: "RSA",
    description: "Configuration for RSA encryption and decryption",
    components: [
      {
        type: "input",
        label: "Private key",
        description: "The private key to decrypt messages using RSA",
        key: "rsa_private",
        multiLine: true,
        lines: 4,
        protected: true
      },
      {
        type: "input",
        label: "Public key",
        description: "The public key to encrypt messages using RSA",
        key: "rsa_public",
        multiLine: true,
        lines: 3
      },
      {
        type: "button",
        label: "Generate public key",
        decription: "Generate a public key to encrypt messages that can be decrypted using your private key",
        onclick: () => {

        }
      }
    ]
  },
  {
    type: "input",
    label: "AES Key",
    description: "The key to encrypt and decrypt messages using AES",
    key: "aes_key",
    protected: true
  },
] as SettingsComponent[]