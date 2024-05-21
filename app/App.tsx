import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
<<<<<<< HEAD
import { Colors } from "react-native/Libraries/NewAppScreen";
=======

>>>>>>> 99ed4e9d6e8ea59714dc7f9e75c94ce7c582f65f
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { AppNavigation } from "./screens/navigation/AppNavigation";
import { Colors } from "react-native/Libraries/NewAppScreen";

async function enableMocking() {
  if (!__DEV__) {
    return;
  }

  await import("../msw.polyfills");
  const { server } = await import("@/mocks/browser");
  server.listen();
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
<<<<<<< HEAD
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
=======
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
>>>>>>> 99ed4e9d6e8ea59714dc7f9e75c94ce7c582f65f
  );
}

export default App;
