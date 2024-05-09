import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IMP from "iamport-react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootStackParam = {
  id: undefined;
};

export function Certification() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  /* [필수입력] 본인인증 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response: any) {
    console.log(response);
    navigation.replace("id", response);
  }

  /* [필수입력] 본인인증에 필요한 데이터를 입력합니다. */
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: "아임포트",
    carrier: "",
    name: "",
    phone: "",
    min_age: "",
  };

  return (
    <IMP.Certification
      userCode={"imp18262154"} // 가맹점 식별코드
      // loading={<Loading />} // 로딩 컴포넌트
      data={data} // 본인인증 데이터
      callback={callback} // 본인인증 종료 후 콜백
    />
  );
}
