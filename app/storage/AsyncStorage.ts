import AsyncStorage from "@react-native-async-storage/async-storage";

// get
export const getAsyncStorage = async (key: string) => {
  const result = await AsyncStorage.getItem(key);
  return result && JSON.parse(result);
};

// set
export const setAsyncStorage = async (key: string, value: string) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

// remove
export const removeAsyncStorage = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};
