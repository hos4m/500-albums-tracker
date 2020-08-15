import { AsyncStorage } from "react-native";

export const storeAlbum = (albumNumber: number, newVal: boolean) => {
  try {
    AsyncStorage.setItem(String(albumNumber), JSON.stringify(newVal));
  } catch (error) {
    alert(error);
  }
};
