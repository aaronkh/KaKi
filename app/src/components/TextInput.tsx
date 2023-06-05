import React from "react";
import {
  StyleSheet,
  Text,
  TextInput as Input,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Spacing from "../theme/Spacing";

export default function TextInput({
  label,
  textInputProps,
  style,
}: {
  label: string;
  textInputProps?: TextInputProps;
  style?: ViewStyle | ViewStyle[];
}) {
  return (
    <View style={style}>
      <Text style={[Spacing.mb4, styles.text]}>{label}</Text>
      <Input style={[Spacing.p16, styles.input]} {...textInputProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#e1e1e1",
    borderRadius: 16,
  },
  text: {
    fontSize: 12,
  },
});
