import { React, ReactNative, NavigationNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import settings from "./settings";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { toasts } from "@vendetta/ui";
const { FormRow, FormInput, FormSwitch } = Forms;
const { ScrollView } = ReactNative;

const navigation = NavigationNative.useNavigation();

function generateSettingsPage(settings: SettingsComponent[], storage) {
  return settings.map((setting) => {
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
          <FormRow
            label={setting.label}
            subLabel={setting.description}
            trailing={<FormRow.Arrow/>}
            onPress={() => navigation.push("VendettaCustomPage", { 
              title: setting.label,
              render: () => {
                return (
                  <ScrollView>
                    {setting.choices.map((option) => {
                      return (
                        <FormRow
                          label={option.label}
                          subLabel={option.description}
                          leading={<FormRow.Icon source={storage[setting.key] === option.value ? getAssetIDByName("ic_radio_circle_checked") : getAssetIDByName("ic_radio_circle")}/>}
                          onPress={() => {
                            storage[setting.key] = option.value;
                            toasts.showToast("Settings saved!");
                          }}
                        />
                      );
                    })}
                  </ScrollView>
                );
              }
            })}
          />
        );
      case "checklist":
        return (
          <FormRow
            label={setting.label}
            subLabel={setting.description}
            trailing={<FormRow.Arrow/>}
            onPress={() => navigation.push("VendettaCustomPage", {
              title: setting.label,
              render: () => {
                return (
                  <ScrollView>
                    {setting.choices.map((option) => {
                      return (
                        <FormRow
                          label={option.label}
                          subLabel={option.description}
                          leading={<FormRow.Icon source={storage[setting.key].includes(option.value) ? getAssetIDByName("ic_radio_square_checked_24px") : getAssetIDByName("ic_radio_square_24px")}/>}
                          onPress={() => {
                            if (storage[setting.key].includes(option.value)) {
                              storage[setting.key] = storage[setting.key].filter((value: string) => value !== option.value);
                            } else {
                              storage[setting.key].push(option.value);
                            }
                            toasts.showToast("Settings saved!");
                          }}
                        />
                      );
                    })}
                  </ScrollView>
                );
              }
            })}
          />
        );
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
      default:
        return null;
    }
  });
}

export default () => {
  useProxy(storage);

  return generateSettingsPage(settings, storage);

};
