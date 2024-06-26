import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StartRootStackParam } from "../navigation/StartStackNavigation";
import { GradationButton } from "@/components/common/GradationButton";

export function Welcome(): React.JSX.Element {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();

  const handlePressNextButton = () => {
    navigation.replace("login");
  };

  return (
    <View style={[styles.container, { paddingTop: 60 + top }]}>
      <View style={styles.topContainer}>
        <Image source={require("@assets/images/logo_chatBubble.png")} />
        <View style={styles.textBox}>
          <Text style={styles.mainTitle}>{"Michi에 오신 것을\n환영합니다!"}</Text>
          <Text style={styles.mainDescription}>아래의 규칙을 읽고 함께 에티켓을 지켜요!</Text>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.subBox}>
          <Image style={styles.icon} source={require("@assets/images/welcome/emoji_01.png")} />
          <View style={styles.textBox}>
            <Text style={styles.subTitle}>내 모습 그대로 당당하게!</Text>
            <Text style={styles.subDescription}>사진·나이·자기소개를 사실대로 올려 주세요.</Text>
          </View>
        </View>
        <View style={styles.subBox}>
          <Image style={styles.icon} source={require("@assets/images/welcome/emoji_02.png")} />
          <View style={styles.textBox}>
            <Text style={styles.subTitle}>안전을 최우선으로!</Text>
            <Text style={styles.subDescription}>상대방을 잘 모르는 상태에서 개인 정보를 알려주지 마세요.{"\n"}안전한 만남을 위한 팁을 확인해 보세요.</Text>
          </View>
        </View>
        <View style={styles.subBox}>
          <Image style={styles.icon} source={require("@assets/images/welcome/emoji_03.png")} />
          <View style={styles.textBox}>
            <Text style={styles.subTitle}>매너 있는 대화</Text>
            <Text style={styles.subDescription}>존중받고 싶은 만큼 존중을 표현해 주세요.</Text>
          </View>
        </View>
      </View>
      <GradationButton text="에티켓을 지킬 것을 약속합니다" onPress={handlePressNextButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 25,
    position: "relative",
    flexGrow: 1,
    backgroundColor: "white",
  },

  topContainer: {
    flexDirection: "row",
    gap: 15,
  },

  textBox: {
    flexShrink: 1,
    gap: 5,
  },

  mainTitle: {
    color: "black",
    fontSize: 24,
    fontFamily: "JalnanGothic",
  },

  mainDescription: {
    color: "#7000FF",
    fontSize: 12,
    fontFamily: "NotoSansKR-Bold",
  },

  middleContainer: {
    marginVertical: 50,
  },

  subBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 25,
  },

  icon: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },

  subTitle: {
    color: "black",
    fontSize: 14,
    fontFamily: "NotoSansKR-SemiBold",
  },

  subDescription: {
    color: "#141414",
    fontSize: 12,
    fontFamily: "NotoSansKR-Medium",
    letterSpacing: -0.05,
  },
});
