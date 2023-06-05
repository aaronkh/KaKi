import React, { Suspense } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ErrorBoundary from "./ErrorBoundary";
import { Image } from "expo-image";
import Font from "../font";
import Spacing from "../spacing";

export default function Loading({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <View style={styles.view}>
          <ActivityIndicator />
        </View>
      }
    >
      <ErrorBoundary
        fallback={
          <View style={styles.view}>
            <Image
              style={styles.image}
              source={require("../assets/106.Tools.png")}
              contentFit="cover"
            />
            <Text style={[Font.subheader, Spacing.mb16]}>Oh no!</Text>
            <Text>
              Something unexpected happened. Don't worry, we've got our
              engineers working on the problem, and it should be resolved soon.
            </Text>
          </View>
        }
      >
        {children}
      </ErrorBoundary>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 175,
    height: 175,
  },
});
