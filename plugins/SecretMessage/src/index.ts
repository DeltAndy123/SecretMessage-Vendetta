import { logger, metro, patcher } from "@vendetta";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";

patcher.before(
  "dispatch",
  metro.common.FluxDispatcher,
  ([e]) => {
    if (e.type == "MESSAGE_CREATE") {
      e.message.content = `test (hopefully it works) (key is ${storage.key})`;
      return [e]
    }
  }
)

export function onUnload() {
  logger.log("SecretMessage unloaded");
}
export const settings = Settings;