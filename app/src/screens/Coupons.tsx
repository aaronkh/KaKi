import React from "react";
import { FlatList } from "react-native-gesture-handler";
import CouponCard from "../components/cards/CouponCard";
import Spacing from "../theme/Spacing";
import { gql } from "../__generated__/gql";
import { useBackgroundQuery, useReadQuery } from "@apollo/client";
import Loading from "../components/Loading";
import { QueryReference } from "@apollo/client/react/cache/QueryReference";
import { GetCouponsQuery } from "../__generated__/graphql";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Font from "../theme/Font";
import { useRoute } from "@react-navigation/native";
import { ShopCouponsRouteProps } from "../navigators/ShopsStack";
import auth from "@react-native-firebase/auth";

const GET_COUPONS = gql(`
query GetCoupons($square_id: String!, $firebase_token: String!) {
  store(square_id: $square_id) {
    coupons_by_user(firebase_token: $firebase_token) {
      square_id
      title
      subtitle
      items {
        square_id
        name
        description
        image
      }
    }
  }
}
`);

export default function Coupons() {
  const route = useRoute<ShopCouponsRouteProps>();
  const { squareId } = route.params;
  const [queryRef] = useBackgroundQuery(GET_COUPONS, {
    variables: {
      square_id: squareId,
      firebase_token: auth().currentUser?.uid ?? "",
    },
  });
  return (
    <Loading>
      <Content queryRef={queryRef} />
    </Loading>
  );
}

function Content({ queryRef }: { queryRef: QueryReference<GetCouponsQuery> }) {
  const { data } = useReadQuery(queryRef);
  return (
    <FlatList
      ListEmptyComponent={
        <View style={Spacing.p24}>
          <Image
            style={[Spacing.mb16, styles.image]}
            source={require("../assets/21.Moving-out.png")}
            contentFit="cover"
          />
          <Text style={[Font.subheader, Spacing.mb16]}>No coupons found.</Text>
          <Text>This store hasn't given you any coupons yet.</Text>
        </View>
      }
      ListFooterComponent={<View style={Spacing.p24} />}
      style={Spacing.p24}
      data={data.store?.coupons_by_user}
      renderItem={({ item }) => (
        <CouponCard
          imageUri={item.items[0].image}
          title={item.title}
          subtitle={item.subtitle}
          conditions=""
          qr={item.square_id}
          style={Spacing.mb16}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 175,
    width: 175,
  },
});
