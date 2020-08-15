import { AsyncStorage } from "react-native";

export const storeAlbum = async (albumNumber: number, newVal: boolean) => {
  try {
    await AsyncStorage.setItem(String(albumNumber), JSON.stringify(newVal));
  } catch (error) {
    alert(error);
  }
};
