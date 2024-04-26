module.exports = {
  root: true,
  extends: ["eslint:recommended", "@react-native-community", "airbnb", "airbnb/hooks", "plugin:prettier/recommended"],

  rules: {
    camelcase: "off", // 카멜케이스 적용x
    "no-console": "off",
    "no-underscore-dangle": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-nested-ternary": "off", // 중첩삼항연산 허용
    "import/prefer-default-export": "off", // 단일 export에서 default 기본문 추가 작성x
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off", // 프롭스 타입 강제 적용 x
  },
};
