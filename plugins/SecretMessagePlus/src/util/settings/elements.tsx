import { constants, stylesheet } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";
import { General } from "@vendetta/ui/components";
const { View, Text } = General;

const styles = stylesheet.createThemedStyleSheet({
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

export const Section = ({ label, description, children }: { label?: string, description?: string, children: JSX.Element | JSX.Element[] }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{...styles.sectionLabel}}>{label}</Text>
      {children}
      <Text style={{...styles.sectionDescription}}>{description}</Text>
    </View>
  )
};