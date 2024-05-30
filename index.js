/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./app/App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";
import notifee, { EventType, AndroidImportance } from "@notifee/react-native";

// 알림 처리 함수
const handleNotification = async message => {
  console.log("Received message:", message);

  const channelId = await notifee.createChannel({
    id: "default_channel",
    name: "default_channel",
    importance: AndroidImportance.HIGH,
  });

  // 디바이스에 알림을 표시합니다.
  await notifee.displayNotification({
    id: message.messageId, // 각 메시지에 고유한 ID를 사용
    title: message.notification?.title,
    body: message.notification?.body,
    android: {
      channelId: channelId,
    },
  });
};

// 포그라운드에서 메시지 수신
messaging().onMessage(async remoteMessage => {
  console.log("Foreground message received:", remoteMessage);
  handleNotification(remoteMessage);
});

// 백그라운드에서 메시지 수신
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Background message received:", remoteMessage);
  handleNotification(remoteMessage);
});

// 포그라운드 이벤트 리스너
notifee.onForegroundEvent(async ({ type, detail }) => {
  console.log("Foreground event:", type, detail);
  if (type === EventType.PRESS || type === EventType.DISMISSED) {
    notifee.cancelNotification(detail.notification?.id || "");
  }
});

// 백그라운드 이벤트 리스너
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log("Background event:", type, detail);
  if (type === EventType.ACTION_PRESS || type === EventType.DISMISSED) {
    notifee.cancelNotification(detail.notification?.id || "");
  }
});

AppRegistry.registerComponent(appName, () => App);
