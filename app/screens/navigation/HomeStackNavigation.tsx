import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { FeedCreat } from "../home/FeedCreat";
import { FeedEdit } from "../home/FeedEdit";
import { Home } from "../home/Home";
import { useAlert } from "@/hooks/useAlert";

export type HomeRootStackParam = {
  homeMain: undefined;
  feedCreat: undefined;
  feedEdit: { postNumber: number };
};

const Stack = createNativeStackNavigator<HomeRootStackParam>();

function CustomBackButton({ navigation, title }: { navigation: any, title: string }) {
  const { setAlertState } = useAlert();

  const handleCreatBackPress = () => {
    setAlertState({
      open: true,
      title: "작성중인 피드를 삭제할까요?",
      desc: "삭제된 피드는 복구되지 않습니다.",
      defaultText: "확인",
      onPress: () => {
        navigation.goBack();
      },
      cancelText: "취소",
    });
  };

  return (
    <TouchableOpacity onPress={handleCreatBackPress} style={styles.backButton}>
      <Icon name="arrowleft" size={22} color="#111" style={styles.icon} />
      <Text style={styles.backButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function CustomEditBackButton({ navigation, title }: { navigation: any, title: string }) {
  const { setAlertState } = useAlert();

  const handleEditBackPress = () => {
    setAlertState({
      open: true,
      title: "수정중인 피드를 취소할까요?",
      desc: "변경사항이 적용되지 않습니다.",
      defaultText: "확인",
      onPress: () => {
        navigation.goBack();
      },
      cancelText: "취소",
    });
  };

  return (
    <TouchableOpacity onPress={handleEditBackPress} style={styles.backButton}>
      <Icon name="arrowleft" size={22} color="#111" style={styles.icon} />
      <Text style={styles.backButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10, // 버튼 영역에 여백을 추가
  },
  icon: {
    marginRight: 10, // 아이콘과 텍스트 사이에 여백을 추가
  },
  backButtonText: {
    fontFamily: "Freesentation-5Medium",
    fontSize: 18, // 텍스트 크기 조정
    color: "#111",
  },
});

export function HomeStackNavigation({ navigation, route }: { navigation: any; route: any }) {
  const customStackNavigationOptions: NativeStackNavigationOptions = {
    gestureEnabled: false,
    title: "",
    headerStyle: {
      backgroundColor: "#209bec",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "feedCreat" || routeName === "feedEdit") {
      // feedCreat, feedEdit 화면에 대해 tabBar none을 설정한다.
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: undefined } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="homeMain" screenOptions={customStackNavigationOptions}>
      <Stack.Screen name="homeMain" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="feedCreat"
        component={FeedCreat}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerTitle: "",
          headerLeft: () => <CustomBackButton navigation={navigation} title="피드 작성하기" />,
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#111",
        }}
      />
      <Stack.Screen
        name="feedEdit"
        component={FeedEdit}
        options={{
          headerShown: true,
          gestureEnabled: false,
          headerTitle: "",
          headerLeft: () => <CustomEditBackButton navigation={navigation} title="피드 수정하기" />,
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#111",
        }}
      />
    </Stack.Navigator>
  );
}