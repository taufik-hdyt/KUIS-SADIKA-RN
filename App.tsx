import { ClerkProvider } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import MainNavigation from "./navigation/MainNavigation";
import store from "./redux/store";

const CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_KEY!} tokenCache={tokenCache}>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <NativeBaseProvider>
            <NavigationContainer>
              <MainNavigation />
            </NavigationContainer>
          </NativeBaseProvider>
        </Provider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

// import { Platform } from "react-native";
// import { io } from "socket.io-client";

// export const BaseURL =
//   Platform.OS === "android" ? "http://192.168.212.175:8081" : "http://localhost:3000";

// export const socket = io.connect("http://192.168.212.175:3000");
