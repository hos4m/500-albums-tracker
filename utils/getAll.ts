import { AsyncStorage } from "react-native";

export const getAll = async () => {
  try {
    const result: any = {};
    const keys = await AsyncStorage.getAllKeys();
    for (const key of keys) {
      const val = await AsyncStorage.getItem(key);
      result[key] = val;
    }
    return result;
  } catch (error) {
    alert(error);
  }
};
