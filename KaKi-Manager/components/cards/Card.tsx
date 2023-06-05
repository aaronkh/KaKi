import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import Color, { CardColor } from "../../theme/Color";
import Spacing from "../../theme/Spacing";
import Font, { CardFont } from "../../theme/Font";

interface Props {
  imageUri?: string | null | undefined;
  title: string;
  subtitle?: string | null | undefined;
  leftContent?: string | null | undefined;
  rightContent?: string | null | undefined;
  style?: ViewStyle | ViewStyle[];
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Card(props: Props) {
  const { width } = useWindowDimensions();
  const padding = 24;
  const containerWidth = width - 2 * padding;
  const spacingBetween = 24;
  const cardWidth = (containerWidth - spacingBetween) / 2;
  return (
    <View style={[styles.card, { width: cardWidth }, props.style]}>
      {props.imageUri != null ? (
        <Image
          style={styles.image}
          source={props.imageUri}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      ) : (
        <View style={[styles.image, styles.center, styles.default]}>
          <Text style={Font.header}>
            {props.title
              .split(" ")
              .map((word) => word[0] ?? "")
              .join("")
              .toUpperCase()}
          </Text>
        </View>
      )}
      <View style={Spacing.p16}>
        <Text numberOfLines={1} style={CardFont.title}>
          {props.title}
        </Text>
        {props.subtitle && (
          <Text numberOfLines={1} style={[CardFont.subtitle, Spacing.mt8]}>
            {props.subtitle}
          </Text>
        )}
        {(props.leftContent != null || props.rightContent != null) && (
          <View style={[styles.footer, Spacing.mt4]}>
            <Text numberOfLines={1} style={CardFont.leftContent}>
              {props.leftContent}
            </Text>
            <Text numberOfLines={1} style={CardFont.rightContent}>
              {props.rightContent}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: CardColor.background,
    overflow: "hidden",
    shadowColor: CardColor.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 165,
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  default: {
    backgroundColor: Color.accent,
  },
});
