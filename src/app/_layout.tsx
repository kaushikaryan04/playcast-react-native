import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store } from "../state/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootState } from "../state/store";

function Layout() {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="homefeed" />
            <Stack.Screen name="videoDetail" />
            <Stack.Screen name="uploadvideo" />
          </>
        ) : (
          <>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
          </>
        )}
      </Stack>
    </SafeAreaProvider>
  );
}

const AppWrapper = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);

export default AppWrapper;
