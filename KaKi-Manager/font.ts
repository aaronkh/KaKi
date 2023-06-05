import { StyleSheet } from "react-native";
import Color, { CardColor } from "./color";

export default StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "700",
  },
  subheader: {
    fontSize: 16,
    fontWeight: "500",
  },
  text: {
    fontSize: 14,
    fontWeight: "normal",
  },
});

export const CardFont = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: CardColor.title,
  },
  subtitle: {
    fontSize: 12,
    color: CardColor.subtitle,
  },
  leftContent: {
    color: CardColor.content,
    fontSize: 14,
    fontWeight: "500",
  },
  rightContent: {
    fontSize: 12,
    fontWeight: "600",
    color: Color.positive,
  },
});
