import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  SuspenseCache,
} from "@apollo/client";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons'
import Settings from "./screens/Settings";
import Scanner from "./screens/Scanner";
import Cart from "./screens/Cart";
import Analytics from "./screens/Analytics";
import { storeId as _storeId } from './atoms'

const client = new ApolloClient({
  uri: "https://vwke9mif92.execute-api.us-east-1.amazonaws.com/dev/graphql",
  cache: new InMemoryCache(),
});
const suspenseCache = new SuspenseCache();

const Tab = createBottomTabNavigator();
export default () => (
  <RecoilRoot>
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              switch (route.name) {
                case 'Scanner':
                  return <Ionicons name="scan" size={size} color={color} />;
                case 'Cart':
                  return <Ionicons name="cart-outline" size={size} color={color} />;
                case 'Analytics':
                  return <Ionicons name="pie-chart-outline" size={size} color={color} />;
                case 'Settings':
                  return <Ionicons name="settings-outline" size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Scanner" component={Scanner} />
          <Tab.Screen name="Cart" component={Cart} />
          <Tab.Screen name="Analytics" component={Analytics} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  </RecoilRoot>
);
