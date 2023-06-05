import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import {
  ApolloClient,
  SuspenseCache,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import ErrorBoundary from "./components/ErrorBoundary";
import RootStack from "./navigators/RootStack";

const suspenseCache = new SuspenseCache();
const client = new ApolloClient({
  uri: "https://vwke9mif92.execute-api.us-east-1.amazonaws.com/dev/graphql",
  cache: new InMemoryCache(),
});

function useAuth() {
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);
  return { initializing };
}

export function AppProvider() {
  return (
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      <App />
    </ApolloProvider>
  );
}

function App() {
  const { initializing } = useAuth();
  if (initializing) return <></>;
  return (
    <>
      <StatusBar style="auto" />
      <ErrorBoundary>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ErrorBoundary>
    </>
  );
}

registerRootComponent(AppProvider);
