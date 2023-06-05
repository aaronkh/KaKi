import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Spacing from "../../theme/Spacing";
import Font from "../../theme/Font";
import Button from "../../components/Button";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { SignInNavigationProps } from "../../navigators/OnboardingStack";
import { RootNavigationProps } from "../../navigators/RootStack";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { useMutation } from "@apollo/client";
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

export default function SignIn() {
  const navigation = useNavigation<SignInNavigationProps>();
  const rootNav = useNavigation<RootNavigationProps>();
  const [upsertUser] = useMutation(UPSERT_USER);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        setLoading(false);
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining access token";
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      const { user, additionalUserInfo } = await auth().signInWithCredential(
        facebookCredential
      );
      if (!additionalUserInfo?.isNewUser) {
        return skip();
      }
      await upsertUser({
        variables: {
          user: {
            firebase_token: user?.uid ?? "",
            name: user?.displayName ?? "",
          },
        },
      });
      navigation.navigate("Info");
    } catch (e) {
      alert("Something went wrong");
    }
    setLoading(false);
  }

  function skip() {
    rootNav.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Root" }],
      })
    );
  }

  return (
    <View style={[styles.view, Spacing.p24]}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/199.Social-Networks.png")}
          style={[styles.image]}
        />
        <Text style={[Font.header, Spacing.mb8]}>Sign In</Text>
        <Text style={styles.center}>
          Create an account or login to view personalized discounts.
        </Text>
      </View>
      <Button
        label="Sign In with Facebook"
        onPress={signIn}
        textStyle={styles.fbText}
        style={[Spacing.mb12, styles.fbButton]}
        loading={loading}
      />
      <Button
        label="Skip"
        onPress={skip}
        style={styles.skip}
        textStyle={Font.text}
        disabled={loading}
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
  fbButton: {
    backgroundColor: "#4267B2",
  },
  fbText: {
    color: "#FFF",
  },
  skip: {
    backgroundColor: "transparent",
  },
});
