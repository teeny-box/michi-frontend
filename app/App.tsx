import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { AppNavigation } from "@screens/navigation/AppNavigation";
import { Alert } from "@components/common/Alert";
import { ToastCustom } from "./components/common/ToastCustom";
import { Loading } from "./screens/common/Loading";
import { APP_ENV } from "@env";
import { SoketClient } from "./socket/socket-clients";

async function enableMocking() {
  console.log("APP_ENV : ", APP_ENV);
  if (APP_ENV !== "development") {
    return;
  }

  await import("../msw.polyfills");
  const { server } = await import("@/mocks/browser");
  server.listen({ onUnhandledRequest: "bypass" });
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const soketClient = new SoketClient();
    soketClient.onModuleInit();

    enableMocking().then(() => setLoading(false));

    getToken();

    return () => {
      soketClient.soketClient.close(); // 소켓 연결 해제
    };
  }, []);

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log("디바이스 토큰값");
    console.log(fcmToken);
  };

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
