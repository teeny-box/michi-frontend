import IMP from "iamport-react-native";

interface CertificationPropsType {
  callback: (response: any) => void;
}

export function IMPCertification({ callback }: CertificationPropsType): React.JSX.Element {
  /* [필수입력] 본인인증에 필요한 데이터를 입력합니다. */
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: "아임포트",
    carrier: "",
    name: "",
    phone: "",
    min_age: "19",
    type: "certification",
  };

  return (
    <IMP.Certification
      userCode={"imp18262154"} // 가맹점 식별코드
      data={data} // 본인인증 데이터
      callback={callback} // 본인인증 종료 후 콜백
    />
  );
}
