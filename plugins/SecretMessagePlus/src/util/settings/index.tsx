import { React, ReactNative, NavigationNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { storage as st } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { SettingsComponent, isJSXElement } from "../types";
const { FormRow, FormInput, FormSwitch, FormSection, FormDivider, FormRadioRow } = Forms;
const { ScrollView } = ReactNative;



export function generateSettingsPage(settings: (SettingsComponent | JSX.Element)[], storage: typeof st): JSX.Element {
  useProxy(storage)
  const navigation = NavigationNative.useNavigation()
  return (<ScrollView>{
    settings.map((setting) => {
      if (isJSXElement(setting)) return setting
      switch (setting.type) {
        case "switch":
          return (
            <FormRow
              label={setting.label}
              subLabel={setting.description}
              trailing={<FormSwitch
                value={storage[setting.key] ?? setting.default}
                onValueChange={(value: boolean) => storage[setting.key] = value}
              />}
            />
          );
        case "radio":
          return (
            <FormSection title={setting.label}>
              <ReactNative.FlatList
                data={setting.choices}
                ItemSeparatorComponent={FormDivider}
                renderItem={({ item }) => {
                  return (
                    <FormRadioRow
                      label={item.label}
                      subLabel={item.description}
                      selected={storage[setting.key] === item.value}
                      onPress={() => {
                        storage[setting.key] = item.value;
                      }}
                    />
                  )
                }}
              />
            </FormSection>
          );
        case "checklist":
          return (
            <FormSection title={setting.label}>
              <ReactNative.FlatList
                data={setting.choices}
                ItemSeparatorComponent={FormDivider}
                renderItem={({ item }) => {
                  if (!storage[setting.key]) storage[setting.key] = [];
                  return (
                    <FormRadioRow
                      label={item.label}
                      subLabel={item.description}
                      selected={storage[setting.key].includes(item.value)}
                      onPress={() => {
                        if (storage[setting.key].includes(item.value)) {
                          storage[setting.key] = storage[setting.key].filter((value: string) => value !== item.value);
                        } else {
                          storage[setting.key] = [...storage[setting.key], item.value];
                        }
                      }}
                    />
                  )
                }}
              />
            </FormSection>
          )
        case "input":
          return (
            <FormInput
              title={setting.label}
              value={storage[setting.key] ?? setting.default}
              onSubmitEditing={(e) => storage[setting.key] = e.nativeEvent.text}
              placeholder={setting.description}
              returnKeyType="done"
              secureTextEntry={setting.secure}
              multiline={setting.lines > 1}
              numberOfLines={setting.lines || 1}
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
              trailing={<FormRow.Arrow/>}
              onPress={() => navigation.push("VendettaCustomPage", {
                title: setting.label,
                render: () => {
                  return generateSettingsPage(setting.components, storage);
                }
              })}
            />
          );
        case "title":
          return (
            <FormSection
              title={setting.label}
              description={setting.description}
            />
          );
        default:
          return null;
      }
    })
  }</ScrollView>)
}