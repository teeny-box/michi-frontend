module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./app"],
        extensions: [".ios.ts", ".android.ts", ".ts", ".ios.tsx", ".android.tsx", ".tsx", ".jsx", ".js", ".json"],
        alias: {
          "@": "./app",
          "@assets": "./app/assets",
          "@components": "./app/components",
          "@hook": "./app/hook",
          "@mocks": "./app/mocks",
          "@recoil": "./app/recoil",
          "@screens": "./app/screens",
          "@storage": "./app/storage",
          "@utils": "./app/utils",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};
