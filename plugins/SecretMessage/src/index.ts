import { logger, metro, patcher } from "@vendetta";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";
import { decryptMessage } from "./util/encrypt";

const unload = [
  patcher.before("dispatch", metro.common.FluxDispatcher, ([e]) => {
    if (e.type == "MESSAGE_CREATE") {
      e.message.content = decryptMessage(e.message.content);
      return [e];
    }
  }),
];

export function onUnload() {
  unload.forEach((u) => u());
}
export const settings = Settings;
