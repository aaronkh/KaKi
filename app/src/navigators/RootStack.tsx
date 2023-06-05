import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import Drawer from "./Drawer";
import OnboardingStack from "./OnboardingStack";
import auth from "@react-native-firebase/auth";

export type RootStackParams = {
  Onboarding: undefined;
  Root: undefined;
};
export type RootNavigationProps = NativeStackScreenProps<
  RootStackParams,
  "Root"
>["navigation"];
export type OnboardingNavigationProps = NativeStackScreenProps<
  RootStackParams,
  "Onboarding"
>["navigation"];

const Stack = createNativeStackNavigator<RootStackParams>();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={auth().currentUser != null ? "Root" : "Onboarding"}
    >
      <Stack.Screen name="Onboarding" component={OnboardingStack} />
      <Stack.Screen name="Root" component={Drawer} />
    </Stack.Navigator>
  );
}
