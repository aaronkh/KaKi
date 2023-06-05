import React from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding/GetStarted";
import SignIn from "../screens/Onboarding/SignIn";
import Info from "../screens/Onboarding/Info";

export type OnboardingStackParams = {
  "Get Started": undefined;
  "Sign In": undefined;
  Info: undefined;
};
export type GetStartedNavigationProps = NativeStackScreenProps<
  OnboardingStackParams,
  "Get Started"
>["navigation"];
export type SignInNavigationProps = NativeStackScreenProps<
  OnboardingStackParams,
  "Sign In"
>["navigation"];
export type InfoNavigationProps = NativeStackScreenProps<
  OnboardingStackParams,
  "Info"
>["navigation"];

const Stack = createNativeStackNavigator<OnboardingStackParams>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Get Started" component={Onboarding} />
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Info" component={Info} />
    </Stack.Navigator>
  );
}
