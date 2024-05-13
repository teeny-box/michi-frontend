/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import { StatusBar, useColorScheme, StyleSheet } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { StartStackNavigation } from "./screens/navigation/StartStackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MainTabNavigation } from "./screens/navigation/MainTabNavigation";
import { HomeStackNavigation } from "./screens/navigation/HomeStackNavigation";
import { RecoilRoot } from "recoil";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
        <NavigationContainer>
          <StartStackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

export default App;
