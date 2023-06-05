import React from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import Shop from "../screens/Shop";
import Coupons from "../screens/Coupons";

export type ShopsStackParams = {
  Root: undefined;
  Shop: { squareId: string };
  "Shop Coupons": { squareId: string };
};

type RootProps = NativeStackScreenProps<ShopsStackParams, "Root">;
export type RootNavigationProps = RootProps["navigation"];
export type RootRouteProps = RootProps["route"];

type ShopProps = NativeStackScreenProps<ShopsStackParams, "Shop">;
export type ShopNavigationProps = ShopProps["navigation"];
export type ShopRouteProps = ShopProps["route"];

type ShopCouponsProps = NativeStackScreenProps<
  ShopsStackParams,
  "Shop Coupons"
>;
export type ShopCouponsNavigationProps = ShopCouponsProps["navigation"];
export type ShopCouponsRouteProps = ShopCouponsProps["route"];

const Stack = createNativeStackNavigator<ShopsStackParams>();

export default function ShopsStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }: { navigation: RootNavigationProps }) => ({
        headerLeft: ({ canGoBack }) => {
          return (
            <TouchableOpacity
              onPress={
                canGoBack
                  ? () => navigation.goBack()
                  : () => {
                      navigation.dispatch(DrawerActions.toggleDrawer());
                    }
              }
            >
              <Feather
                name={canGoBack ? "chevron-left" : "menu"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          );
        },
      })}
    >
      <Stack.Screen
        name="Root"
        component={Home}
        options={{ headerTitle: "Shops" }}
      />
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={({
          navigation,
          route,
        }: {
          navigation: ShopNavigationProps;
          route: ShopRouteProps;
        }) => ({
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Shop Coupons", {
                    squareId: route.params.squareId,
                  })
                }
              >
                <Feather name="tag" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen name="Shop Coupons" component={Coupons} />
    </Stack.Navigator>
  );
}
