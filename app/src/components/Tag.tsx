import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Spacing from "../theme/Spacing";
import Color from "../theme/Color";

export default function Tag({
  label,
  onPress,
  active,
  style,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
}) {
  return (
    <TouchableOpacity
      style={[
        Spacing.p12,
        styles.tag,
        active ? styles.active : styles.inactive,
        style,
      ]}
      onPress={onPress}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: Color.accent,
  },
  inactive: {
    backgroundColor: Color.inactive,
  },
  tag: {
    alignSelf: "flex-start",
    borderRadius: 8,
  },
});
