import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Spacing from "../theme/Spacing";
import Card from "../components/cards/Card";
import Font from "../theme/Font";
import { gql } from "../__generated__/gql";
import { QueryReference } from "@apollo/client/react/cache/QueryReference";
import Loading from "../components/Loading";
import { useBackgroundQuery, useMutation, useReadQuery } from "@apollo/client";
import { GetStoreQuery, ItemStatus } from "../__generated__/graphql";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ShopNavigationProps, ShopRouteProps } from "../navigators/ShopsStack";
import { Image } from "expo-image";
import auth from "@react-native-firebase/auth";

const GET_STORE = gql(`
  query GetStore($square_id: String!) {
    store(square_id: $square_id) {
      name
      suggested_items {
        name
        description
        status
        price
        image
      }
      inventory {
        name
        description
        status
        price
        image
      }
      views {
        firebase_token
      }
    }
  }
`);

const VIEW = gql(`
  mutation UpsertView($store: StoreInput!) {
    upsertStore(store: $store) {
        views {
            interests
        }
    }
  }
`);

const itemStatusDisplayNames = {
  [ItemStatus.InStock]: "In stock",
  [ItemStatus.SoldOut]: "Out of stock",
};

function useTitle(title: string | undefined | (() => React.ReactNode)) {
  const navigation = useNavigation<ShopNavigationProps>();
  useEffect(() => {
    navigation.setOptions({ headerTitle: title });
  }, [title, navigation]);
}

export default function Shop() {
  const route = useRoute<ShopRouteProps>();
  const { squareId } = route.params;
  const [queryRef] = useBackgroundQuery(GET_STORE, {
    variables: { square_id: squareId },
  });
  useTitle(() => <ActivityIndicator />);
  return (
    <Loading>
      <Content queryRef={queryRef} />
    </Loading>
  );
}

function Content({ queryRef }: { queryRef: QueryReference<GetStoreQuery> }) {
  const route = useRoute<ShopRouteProps>();
  const { squareId } = route.params;
  const { data } = useReadQuery(queryRef);
  const [viewStore] = useMutation(VIEW);
  useEffect(() => {
    async function view() {
      const views = (data.store?.views ?? []).map(
        (view) => view.firebase_token
      );
      const upsert = [...views, auth().currentUser?.uid].filter(
        (item) => item != null
      ) as string[];
      const vars = {
        store: {
          square_id: squareId,
          views: [...new Set(upsert)],
        },
      };
      await viewStore({
        variables: vars,
      });
    }
    view();
  }, [squareId]);

  useTitle(data.store?.name);
  return (
    <FlatList
      ListEmptyComponent={
        <View style={Spacing.p24}>
          <Image
            style={[Spacing.mb16, styles.image]}
            source={require("../assets/21.Moving-out.png")}
            contentFit="cover"
          />
          <Text style={[Font.subheader, Spacing.mb16]}>No items found.</Text>
          <Text>
            Looks like this store is still setting up. Come back again later!
          </Text>
        </View>
      }
      ListHeaderComponent={
        <>
          {(data.store?.suggested_items.length ?? 0) > 0 && (
            <Text style={[Font.header, Spacing.ph24, Spacing.pt24]}>
              For You
            </Text>
          )}
          <FlatList
            style={Spacing.p24}
            data={data.store?.suggested_items}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback>
                <Card
                  style={Spacing.mr16}
                  imageUri={item.image}
                  title={item.name}
                  subtitle={item.description}
                  leftContent={`$${(item.price / 100).toString()}`}
                  rightContent={itemStatusDisplayNames[item.status]}
                />
              </TouchableWithoutFeedback>
            )}
          />
          <Text style={[Font.header, Spacing.ph24, Spacing.pb24]}>
            Catalogue
          </Text>
        </>
      }
      numColumns={2}
      data={data.store?.inventory}
      columnWrapperStyle={[styles.columns, Spacing.ph24]}
      ListFooterComponent={<View style={Spacing.p24} />}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback>
          <Card
            style={Spacing.mb16}
            imageUri={item.image}
            title={item.name}
            subtitle={item.description}
            leftContent={`$${(item.price / 100).toString()}`}
            rightContent={itemStatusDisplayNames[item.status]}
          />
        </TouchableWithoutFeedback>
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 175,
    width: 175,
  },
  columns: { justifyContent: "space-between" },
});
