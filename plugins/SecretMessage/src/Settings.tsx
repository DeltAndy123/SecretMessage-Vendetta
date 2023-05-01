import { React, ReactNative } from "@vendetta/metro/common";
import { Forms, General } from "@vendetta/ui/components";
import { storage } from "@vendetta/plugin";
const { FormText, FormRow } = Forms;
const { TextInput } = General;
const { ScrollView } = ReactNative;

export default () => (

<ScrollView>
  <FormRow
    label={<TextInput
      value={storage.key}
      onSubmitEditing={(e) => storage.key = e.nativeEvent.text}
      placeholder="Secret key to encrypt messages"
      returnKeyType="done"
      secureTextEntry={true}
      defaultValue={storage.key || ""}
    />}
  />
</ScrollView>

);
