import { stylesheet } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";

export default stylesheet.createThemedStyleSheet({
  group: {
    width: "90%",
    margin: "auto",
    borderRadius: 10,
    backgroundColor: semanticColors.BACKGROUND_SECONDARY,
    borderWidth: 1,
    borderColor: semanticColors.BORDER,
    
  }
});