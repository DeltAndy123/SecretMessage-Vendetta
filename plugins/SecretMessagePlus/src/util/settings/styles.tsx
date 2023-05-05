import { stylesheet } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";

export default stylesheet.createThemedStyleSheet({
  group: {
    width: "90%",
    marginLeft: "5%",
    borderRadius: 10,
    backgroundColor: semanticColors.BACKGROUND_MOBILE_SECONDARY,
    overflow: "hidden",
  }
});