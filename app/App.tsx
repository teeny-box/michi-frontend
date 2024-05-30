import React, { useEffect, useState } from "react";
import { Platform, StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { AppNavigation } from "@screens/navigation/AppNavigation";
import { Alert } from "@components/common/Alert";
import { ToastCustom } from "./components/common/ToastCustom";
import { Loading } from "./screens/common/Loading";

async function enableMocking() {
  if (!__DEV__) {
    return;
  }

  await import("../msw.polyfills");
  const { server } = await import("@/mocks/browser");
  server.listen({ onUnhandledRequest: "bypass" });
}

if (Platform.OS !== "ios") {
  // 알림 처리 함수
  await import("../notification");
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enableMocking().then(() => setLoading(false));
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      {loading || (
        <RecoilRoot>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
              <AppNavigation />
            </NavigationContainer>
            <Alert />
            <Loading />
            <ToastCustom />
          </SafeAreaProvider>
        </RecoilRoot>
      )}
    </>
  );
}

export default App;
