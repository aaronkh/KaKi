import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Color, { CardColor } from "../../theme/Color";
import Spacing from "../../theme/Spacing";
import Font, { CardFont } from "../../theme/Font";
import { TouchableOpacity } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";

interface Props {
  imageUri?: string | null | undefined;
  title: string;
  subtitle?: string | null | undefined;
  conditions?: string | null | undefined;
  qr?: string | null | undefined;
  style?: ViewStyle | ViewStyle[];
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const defaultQR = "qr";
const qrPrefix = "[QR]";
const defaultImage = "https://picsum.photos/seed/696/3000/2000";

export default function CouponCard(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={props.style}>
      <TouchableOpacity style={styles.card} onPress={() => setIsOpen(!isOpen)}>
        {props.imageUri != null ? (
          <Image
            style={styles.image}
            source={props.imageUri ?? defaultImage}
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
        <View style={[styles.text, Spacing.p16]}>
          <Text numberOfLines={1} style={CardFont.title}>
            {props.title}
          </Text>
          <Text numberOfLines={1} style={[CardFont.subtitle, Spacing.mt8]}>
            {props.subtitle}
          </Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.card, Spacing.mt8, Spacing.p24]}>
          <View>
            <View style={Spacing.mb16}>
              <QRCode value={`${qrPrefix}${props.qr ?? defaultQR}`} />
            </View>
            <Text style={[CardFont.title, Spacing.mb8]}>{props.title}</Text>
            <Text style={[CardFont.subtitle, Spacing.mb16]}>
              {props.subtitle}
            </Text>
            {props.conditions != null && props.conditions.trim() !== "" && (
              <>
                <Text style={[CardFont.title, Spacing.mb8]}>Conditions</Text>
                <Text style={CardFont.subtitle}>{props.conditions}</Text>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
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
    height: 120,
    width: 120,
  },
  text: {
    justifyContent: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  default: {
    backgroundColor: Color.accent,
  },
});
