import React, { useMemo } from "react";
import { Text, View } from "react-native";
import Loading from "../components/Loading";
import { gql } from "../__generated__/gql";
import { useBackgroundQuery, useReadQuery } from "@apollo/client";
import { GetStoreQuery } from "../__generated__/graphql";
import { QueryReference } from "@apollo/client/react/cache/QueryReference";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import randomcolor from "randomcolor";
import Font from "../theme/Font";
import Spacing from "../theme/Spacing";
import { useRecoilState } from "recoil";
import { storeId } from "../atoms";
import PleaseLogin from "../components/PleaseLogin";

const GET_STORE = gql(`
query GetStore($square_id: String!) {
  store(square_id: $square_id) {
    name
    square_id
      views {
      name
      firebase_token
      interests
    }
  }
}
`);

export default function Analytics() {
  const [square_id,] = useRecoilState(storeId)
  const [queryRef] = useBackgroundQuery(GET_STORE, {
    variables: { square_id },
  });
  if (!square_id) return <PleaseLogin />
  return (
    <Loading>
      <Content queryRef={queryRef} />
    </Loading>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

function Content({ queryRef }: { queryRef: QueryReference<GetStoreQuery> }) {
  const { data } = useReadQuery(queryRef);
  const interests = useMemo(
    () => data.store?.views.map((view) => view.interests).flat(),
    [data]
  );
  const interestsDict = useMemo(
    () =>
      interests?.reduce((prev, interest) => {
        interest in prev ? (prev[interest] += 1) : (prev[interest] = 1);
        return prev;
      }, {} as { [key: string]: number }) ?? {},
    [interests]
  );
  const chartData = useMemo(
    () =>
      Object.entries(interestsDict).map(([k, v]) => ({
        name: k,
        value: v,
        color: randomcolor({ seed: k }),
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
      })),
    [interestsDict]
  );
  return (
    <>
      <View style={[Spacing.pt24, Spacing.ph24]}>
        <Text style={[Font.header, Spacing.mb8]}>Statistics</Text>
        <Text style={Spacing.mb24}>{data.store?.views.length ?? 0} Views</Text>
        <Text style={Font.header}>Viewer Interests</Text>
        <Text>See what products your viewers are shopping for</Text>
      </View>
      <PieChart
        data={chartData}
        chartConfig={chartConfig}
        width={Dimensions.get("window").width}
        height={250}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="24"
      />
    </>
  );
}
