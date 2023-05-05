import { constants, stylesheet } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";

export const general = stylesheet.createThemedStyleSheet({
  group: {
    width: "90%",
    marginLeft: "5%",
    borderRadius: 10,
    backgroundColor: semanticColors.BACKGROUND_MOBILE_SECONDARY,
    overflow: "hidden",
  }
});

export const elements = stylesheet.createThemedStyleSheet({
  sectionLabel: {
    color: semanticColors.HEADER_SECONDARY,
    paddingLeft: "5.5%",
    paddingRight: 10,
    marginBottom: 10,
    letterSpacing: 0.25,
    fontFamily: constants.Fonts.PRIMARY_BOLD,
    fontSize: 12,
    textTransform: "uppercase"
  },
  sectionDescription: {
    color: semanticColors.HEADER_SECONDARY,
    paddingLeft: "5.5%",
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: constants.Fonts.PRIMARY_REGULAR,
    fontSize: 12,
  },
})