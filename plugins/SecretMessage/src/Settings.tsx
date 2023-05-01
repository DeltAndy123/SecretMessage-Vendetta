import { React, ReactNative } from "@vendetta/metro/common";
import { Forms, General } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";
const { FormText, FormRow, FormInput, FormSwitch } = Forms;
// const { TextInput } = General;
const { ScrollView } = ReactNative;

export default () => (

<ScrollView>
  {/* <FormRow
    label={<TextInput
      value={storage.key}
      onSubmitEditing={(e) => storage.key = e.nativeEvent.text}
      placeholder="Secret key to encrypt messages"
      returnKeyType="done"
      secureTextEntry={true}
      defaultValue={storage.key || "default"}
    />}
  /> */}
  <FormInput
    title="Key"
    value={storage.key || "default"}
    onSubmitEditing={(e) => storage.key = e.nativeEvent.text}
    placeholder="Secret key to encrypt messages"
    returnKeyType="done"
    secureTextEntry={true}
  />
  <FormRow
    label="Auto shorten text"
    subLabel="Shorten encrypted text by replacing specific char. Can be detected by AutoMod."
    trailing={<FormSwitch
      value={storage.shorten_text}
      onValueChange={(value) => storage.shorten_text = value}
    />}
  />
</ScrollView>

);
