import { logger, metro } from "@vendetta";
import Settings from "./Settings";
import { patcher } from "@vendetta";

patcher.before(
  "dispatch",
  metro.common.FluxDispatcher,
  ([e]) => {
    if (e.type == "MESSAGE_CREATE") {
      e.message.content = "test (hopefully it works)"
      return [e]
    }
  }
)

export function onUnload() {
  logger.log("SecretMessage unloaded");
}
export const settings = Settings;