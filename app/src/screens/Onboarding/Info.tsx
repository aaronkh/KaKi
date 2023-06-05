import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Spacing from "../../theme/Spacing";
import Button from "../../components/Button";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Font from "../../theme/Font";
import TextInput from "../../components/TextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import Tag from "../../components/Tag";
import { RootNavigationProps } from "../../navigators/RootStack";
import auth from "@react-native-firebase/auth";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__/gql";

const tags = [
  "Fashion",
  "Plants",
  "Food",
  "Furniture",
  "Art",
  "Cars",
  "Computers",
  "Video games",
];

const UPSERT_USER = gql(`
  mutation UpsertUser($user: UserInput!) {
    upsertUser(user: $user) {
        firebase_token
        name
        interests
    }
  }
`);

export default function Info() {
  const navigation = useNavigation<RootNavigationProps>();
  const [actives, setActives] = useState<string[]>([]);
  const [name, setName] = useState(auth().currentUser?.displayName ?? "");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [upsertUser] = useMutation(UPSERT_USER);

  async function save() {
    setLoading(true);
    await upsertUser({
      variables: {
        user: {
          firebase_token: auth().currentUser?.uid ?? "",
          interests: actives,
        },
      },
    });
    skip();
    setLoading(false);
  }

  function skip() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Root" }],
      })
    );
  }

  return (
    <SafeAreaView style={[styles.view, Spacing.p24]} edges={["top"]}>
      <View>
        <Text style={[Font.header, Spacing.mb8, styles.center]}>Profile</Text>
        <Text style={[styles.center, Spacing.mb16]}>
          Set up your information and preferences.
        </Text>
        <TextInput
          label="Name"
          textInputProps={{
            placeholder: "Alice Bob",
            value: name,
            onChangeText: setName,
            editable: false,
          }}
          style={Spacing.mb16}
        />
        <TextInput
          label="Email"
          textInputProps={{
            placeholder: "my@email.com",
            value: email,
            onChangeText: setEmail,
            editable: false,
          }}
          style={Spacing.mb24}
        />
        <Text style={[Font.subheader, Spacing.mb16]}>Interests</Text>
        <View style={styles.tags}>
          {tags.map((tag) => (
            <Tag
              label={tag}
              key={tag}
              style={[Spacing.mr4, Spacing.mb4]}
              active={actives.find((active) => active === tag) != null}
              onPress={() => {
                actives.find((active) => active === tag) != null
                  ? setActives([...actives.filter((active) => active !== tag)])
                  : setActives([...actives, tag]);
              }}
            />
          ))}
        </View>
      </View>
      <View>
        <Button label="Save" onPress={save} loading={loading} />
        <Button
          label="Skip"
          onPress={skip}
          style={styles.skip}
          textStyle={Font.text}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    justifyContent: "center",
  },
  center: {
    textAlign: "center",
  },
  skip: {
    backgroundColor: "transparent",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
