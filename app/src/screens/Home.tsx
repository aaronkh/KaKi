import React from "react";
import Card from "../components/cards/Card";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../navigators/ShopsStack";
import Spacing from "../theme/Spacing";
import { gql } from "../__generated__/gql";
import { useBackgroundQuery, useReadQuery } from "@apollo/client";
import { QueryReference } from "@apollo/client/react/cache/QueryReference";
import { GetStoresQuery } from "../__generated__/graphql";
import Loading from "../components/Loading";

const GET_STORES = gql(`
query GetStores {
  stores {
      square_id
      name
  }
}
`);

export default function Home() {
  const [queryRef] = useBackgroundQuery(GET_STORES);
  return (
    <Loading>
      <Content queryRef={queryRef} />
    </Loading>
  );
}

function Content({ queryRef }: { queryRef: QueryReference<GetStoresQuery> }) {
  const { data } = useReadQuery(queryRef);
  const navigation = useNavigation<RootNavigationProps>();
  const onPress = (squareId: string) => {
    navigation.navigate("Shop", { squareId });
  };
  return (
    <FlatList
      numColumns={2}
      data={data.stores}
      columnWrapperStyle={styles.columns}
      style={Spacing.p24}
      ListFooterComponent={<View style={Spacing.p24} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onPress(item.square_id)}
          style={Spacing.mb16}
        >
          <Card title={item.name} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  columns: { justifyContent: "space-between" },
});
