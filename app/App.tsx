import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { AppNavigation } from "./screens/navigation/AppNavigation";

async function enableMocking() {
  if (!__DEV__) {
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
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </RecoilRoot>
      )}
    </>
  );
}

export default App;
