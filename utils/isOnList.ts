import { AsyncStorage } from "react-native";

export const isOnList = async (albumNumber: number) => {
  try {
    const value = await AsyncStorage.getItem(String(albumNumber));
    return value ? JSON.parse(value) : false;
  } catch (error) {
    alert(error);
  }
};
