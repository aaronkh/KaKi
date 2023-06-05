import { Image } from "expo-image";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Spacing from "../../theme/Spacing";
import Font from "../../theme/Font";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { GetStartedNavigationProps } from "../../navigators/OnboardingStack";
import { useMutation } from "@apollo/client";
import auth from "@react-native-firebase/auth";
import { gql } from "../../__generated__/gql";

const UPSERT_USER = gql(`
  mutation UpsertUser($user: UserInput!) {
    upsertUser(user: $user) {
        firebase_token
        name
        interests
    }
  }
`);

function useAuth() {
  const [upsertUser] = useMutation(UPSERT_USER);

  useEffect(() => {
    async function signInAnonymously() {
      if (auth().currentUser == null) {
        const { user } = await auth().signInAnonymously();
        await upsertUser({
          variables: {
            user: {
              firebase_token: user?.uid ?? "",
              name: user?.displayName ?? "",
            },
          },
        });
      }
    }
    signInAnonymously();
  }, []);
}

export default function GetStarted() {
  const navigation = useNavigation<GetStartedNavigationProps>();
  useAuth();
  return (
    <View style={[styles.view, Spacing.p24]}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/137.Space.png")}
          style={[styles.image]}
        />
        <Text style={[Font.header, Spacing.mb8]}>KaKi</Text>
        <Text style={styles.center}>
          Support boutiques, earn exclusive coupons, and view personalized stock
          of items.
        </Text>
      </View>
      <Button
        label="Get Started"
        onPress={() => navigation.navigate("Sign In")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  center: {
    textAlign: "center",
  },
});
