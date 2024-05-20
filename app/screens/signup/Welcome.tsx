import { birthYearState, phoneNumberState } from "@/recoil/signupAtoms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { commonStyles } from "./Common.styled";
import { StartRootStackParam } from "../navigation/StartStackNavigation";
import { GradationButton } from "@/components/common/GradationButton";

export function Welcome(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<StartRootStackParam>>();

  const handlePressNextButton = () => {
    navigation.replace("login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require("@assets/images/logo_chatBubble.png")} />
        <View style={styles.textBox}>
          <Text style={styles.mainTitle}>{"Michi에 오신 것을\n환영합니다!"}</Text>
          <Text style={styles.mainDescription}>아래의 규칙을 읽고 함께 에티켓을 지켜요!</Text>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.subBox}>
          <Image style={styles.icon} source={require("@assets/images/logo_chatBubble.png")} />
          <View style={styles.textBox}>
            <Text style={styles.subTitle}>내 모습 그대로 당당하게!</Text>
            <Text style={styles.subDescription}>사진·나이·자기소개를 사실대로 올려 주세요.</Text>
          </View>
        </View>
        <View style={styles.subBox}>
          <Image style={styles.icon} source={require("@assets/images/logo_chatBubble.png")} />
          <View style={styles.textBox}>
            <Text style={styles.subTitle}>안전을 최우선으로!</Text>
            <Text style={styles.subDescription}>상대방을 잘 모르는 상태에서 개인 정보를 알려주지 마세요. 안전한 만남을 위한 팁을 확인해 보세요.</Text>
          </View>
        </View>
        <View style={styles.subBox}>
          <Image style={styles.icon} source={require("@assets/images/logo_chatBubble.png")} />
          <View style={styles.textBox}>
            <Text style={styles.subTitle}>매너 있는 대화</Text>
            <Text style={styles.subDescription}>존중받고 싶은 만큼 존중을 표현해 주세요.</Text>
          </View>
        </View>
        <View style={styles.subBox}>
          <Image style={styles.icon} source={require("@assets/images/logo_chatBubble.png")} />
          <View style={styles.textBox}>
            <Text style={styles.subTitle}>신고는 적극적으로</Text>
            <Text style={styles.subDescription}>상대가 잘못된 언행을 보이면 무조건 신고해 주세요.</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handlePressNextButton}>
        <GradationButton text="에티켓을 지킬 것을 약속합니다" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 25,
    position: "relative",
    flexGrow: 1,
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
    fontSize: 30,
    fontFamily: "WavvePADO-Regular",
  },

  mainDescription: {
    color: "#141414",
    fontSize: 16,
    fontFamily: "Freesentation-4Regular",
    marginTop: 10,
  },

  middleContainer: {
    marginVertical: 50,
  },

  subBox: {
    flexDirection: "row",
    gap: 5,
    marginLeft: 25,
    marginBottom: 25,
  },

  icon: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },

  subTitle: {
    color: "black",
    fontSize: 16,
    fontFamily: "Freesentation-7Bold",
  },

  subDescription: {
    color: "#141414",
    fontSize: 14,
    fontFamily: "Freesentation-1Thin",
  },

  nextButton: {
    backgroundColor: "lightgrey",
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
});
