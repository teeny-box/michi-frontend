import React, { useEffect, useState } from "react";
import { Modal, Pressable, StatusBar, StyleSheet, Text, View, useColorScheme } from "react-native";
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
  const [openModal, setOpenModal] = useState(false);

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
            <Modal transparent visible={openModal}>
              <View style={styles.modalScreen}>
                <View style={styles.modalBox}>
                  <Text>hello</Text>
                  <Pressable onPress={() => setOpenModal(false)}>
                    <Text>close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </SafeAreaProvider>
        </RecoilRoot>
      )}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  modalScreen: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalBox: {
    height: 200,
    backgroundColor: "#fff",
    marginHorizontal: 25,
    marginVertical: "auto",
    borderWidth: 1,
    borderColor: "#7000ff",
  },
});
