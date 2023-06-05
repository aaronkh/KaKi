import React from "react";
import {
  DrawerContentComponentProps,
  DrawerItem,
  DrawerScreenProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import ShopsStack, { ShopsStackParams } from "./ShopsStack";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

export type DrawerParams = {
  Home: NavigatorScreenParams<ShopsStackParams>;
  Coupons: undefined;
  Invoices: undefined;
};

type HomeProps = DrawerScreenProps<DrawerParams, "Home">;
export type HomeNavigationProps = HomeProps["navigation"];
export type HomeRouteProps = HomeProps["route"];

type CouponsProps = DrawerScreenProps<DrawerParams, "Coupons">;
export type CouponsNavigationProps = CouponsProps["navigation"];
export type CouponsRouteProps = CouponsProps["route"];

type InvoicesProps = DrawerScreenProps<DrawerParams, "Invoices">;
export type InvoicesNavigationProps = InvoicesProps["navigation"];
export type InvoicesRouteProps = InvoicesProps["route"];

const Drawer = createDrawerNavigator<DrawerParams>();

export default function AppDrawer() {
  return (
    <Drawer.Navigator drawerContent={DrawerContent}>
      <Drawer.Screen
        name="Home"
        component={ShopsStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { RootNavigationProps } from "./RootStack";

function DrawerContent(props: DrawerContentComponentProps) {
  const navigation = useNavigation<RootNavigationProps>();
  async function signOut() {
    await auth().signOut();
    navigation.navigate("Onboarding");
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={
          auth().currentUser == null || auth().currentUser?.isAnonymous
            ? "Sign In"
            : "Sign Out"
        }
        onPress={signOut}
      />
    </DrawerContentScrollView>
  );
}
