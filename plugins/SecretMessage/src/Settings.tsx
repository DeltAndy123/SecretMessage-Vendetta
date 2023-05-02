import { React, ReactNative } from "@vendetta/metro/common";
import { Forms, General } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
const { FormText, FormRow, FormInput, FormSwitch } = Forms;
// const { TextInput } = General;
const { ScrollView } = ReactNative;

export default () => {
  useProxy(storage);

  return (
    <ScrollView>
      <FormInput
        title="Key"
        value={storage.key ?? "default"}
        onSubmitEditing={(e) => storage.key = e.nativeEvent.text}
        placeholder="Secret key to encrypt messages"
        returnKeyType="done"
        secureTextEntry={true}
      />
      <FormRow
        label="Auto shorten text"
        subLabel="Shorten encrypted text by replacing specific char. Can be detected by AutoMod."
        trailing={<FormSwitch
          value={storage.shorten_text ?? true}
          onValueChange={(value: boolean) => storage.shorten_text = value}
        />}
      />
      <FormRow
        label="Debug Mode"
        subLabel="Log debug messages to console."
        trailing={<FormSwitch
          value={storage.debug ?? false}
          onValueChange={(value: boolean) => storage.debug = value}
        />}
      />
    </ScrollView>
  )

};
