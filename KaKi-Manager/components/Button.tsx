import React from "react";
// import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Spacing from "../theme/Spacing";
import Color, { CardColor } from "../theme/Color";

export default function Button({
  label,
  onPress,
  style,
  textStyle,
  loading,
  disabled,
}: {
  label: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      style={[styles.button, Spacing.p16, style]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.accent,
    borderRadius: 16,
    width: "100%",
    shadowColor: CardColor.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.0,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
