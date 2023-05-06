import { React, ReactNative, NavigationNative } from "@vendetta/metro/common";
import { Forms, General } from "@vendetta/ui/components";
import { storage as st } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { SettingsComponent, isConfigSettingsComponent, isJSXElement } from "../types";
import { general } from "./styles";
import { Section } from "./elements";
const {
  FormRow,
  FormInput,
  FormSwitch,
  FormDivider,
  FormRadioRow,
} = Forms;
const {
  ScrollView,
  KeyboardAvoidingView,
  Animated,
} = ReactNative;
const { View } = General;

export function generateSettingsPage(
  settings: (SettingsComponent | JSX.Element)[],
  storage: typeof st,
  separator?: any
): JSX.Element {
  useProxy(storage);
  const navigation = NavigationNative.useNavigation();
  var elements = settings.map((setting) => {
    if (isJSXElement(setting)) return setting;
    switch (setting.type) {
      case "group":
        return (
          <Section label={setting.title} description={setting.description}>
            <View style={{ ...general.group }}>
              {generateSettingsPage(
                setting.components,
                storage,
                <FormDivider />
              )}
            </View>
          </Section>
        );
      case "switch":
        return (
          <FormRow
            label={setting.label}
            subLabel={setting.description}
            trailing={
              <FormSwitch
                value={storage.settings[setting.key] ?? setting.default}
                onValueChange={(value: boolean) =>
                  (storage.settings[setting.key] = value)
                }
              />
            }
          />
        );
      case "radio":
        return (
          <Section label={setting.label} description={setting.description}>
            <View style={{ ...general.group }}>
              <ReactNative.FlatList
                data={setting.choices}
                ItemSeparatorComponent={FormDivider}
                renderItem={({ item }) => {
                  return (
                    <FormRadioRow
                      label={item.label}
                      subLabel={item.description}
                      selected={storage.settings[setting.key] === item.value}
                      onPress={() => {
                        storage.settings[setting.key] = item.value;
                      }}
                    />
                  );
                }}
              />
            </View>
          </Section>
        );
      case "checklist":
        return (
          <Section label={setting.label} description={setting.description}>
            <View style={{ ...general.group }}>
              <ReactNative.FlatList
                data={setting.choices}
                ItemSeparatorComponent={FormDivider}
                renderItem={({ item }) => {
                  if (!storage.settings[setting.key]) storage.settings[setting.key] = [];
                  return (
                    <FormRadioRow
                      label={item.label}
                      subLabel={item.description}
                      selected={storage.settings[setting.key].includes(item.value)}
                      onPress={() => {
                        if (storage.settings[setting.key].includes(item.value)) {
                          storage.settings[setting.key] = storage.settings[setting.key].filter(
                            (value: string) => value !== item.value
                          );
                        } else {
                          storage.settings[setting.key] = [
                            ...storage.settings[setting.key],
                            item.value,
                          ];
                        }
                      }}
                    />
                  );
                }}
              />
            </View>
          </Section>
        );
      case "input":
        return (
          <FormInput
            value={storage.settings[setting.key] ?? setting.default}
            onChangeText={(text: string) => (storage.settings[setting.key] = text)}
            title={setting.label}
            placeholder={setting.description}
            secureTextEntry={setting.protected}
            multiline={setting.multiline}
            numberOfLines={setting.lines}
          />
        );
      case "button":
        return (
          <FormRow
            label={setting.label}
            subLabel={setting.description}
            onPress={() => {
              setting.onclick();
            }}
          />
        );
      case "page":
        return (
          <FormRow
            label={setting.label}
            subLabel={setting.description}
            trailing={<FormRow.Arrow />}
            onPress={() =>
              navigation.push("VendettaCustomPage", {
                title: setting.label,
                render: () => {
                  return generateSettingsPage(setting.components, storage);
                },
              })
            }
          />
        );
      default:
        return null;
    }
  });
  if (separator) {
    elements = elements.reduce((acc, el) => {
      if (acc.length === 0) return [el];
      return [...acc, separator, el];
    }, []);
  }
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <Animated.View>{elements}</Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function setDefaults(storage: typeof st, settings: SettingsComponent[]) {
  settings.forEach((setting) => {
    if (isJSXElement(setting)) return;
    if (!isConfigSettingsComponent(setting)) return;
    if (!setting.default) return;
    if (!storage.settings) storage.settings = {};
    
    storage.settings[setting.key] = setting.default;
  });
}