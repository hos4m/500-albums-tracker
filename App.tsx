import React from "react";
import {
  View,
  ScrollView,
  Text as TextNative,
  AsyncStorage,
  TouchableHighlight,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// @ts-ignore
import { Text } from "galio-framework";

import data from "./album-list.json";
import styles from "./App.styles";
import { isOnList, storeAlbum } from "./utils";

export default function App() {
  // AsyncStorage.clear();

  const albumOnPress = async (albumNumber: number) => {
    const val = await isOnList(albumNumber);
    const newVal = JSON.parse(val) ? false : true;
    await storeAlbum(albumNumber, newVal);
  };

  const renderIntro = () => {
    // https://www.rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/
    return (
      <View style={styles.introView}>
        <Text style={[styles.introText, styles.introTextLine1]}>
          Hey! this is the list of the 500 Greatest Albums of All Time created by RollingStone
        </Text>
        <Text style={[styles.introText, styles.introTextLine2]}>
          You can use this app to track your progress. Click on an album to mark it as done or
          undone!
        </Text>
      </View>
    );
  };

  const renderAlbums = () => {
    return data.map((single) => {
      const albumNumber = String(single.Number).padStart(3, "0");
      return (
        <TouchableHighlight key={single.Number} onPress={() => albumOnPress(single.Number)}>
          <View style={styles.item}>
            <Text style={styles.text}>
              <TextNative style={styles.albumNumber}>{albumNumber}</TextNative> {single.Album}
            </Text>
            <Text style={styles.meta}>
              By {single.Artist} &#8226; {single.Genre} &#8212; {single.Year}
            </Text>
          </View>
        </TouchableHighlight>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="light" backgroundColor="#333" />
        {renderIntro()}
        {renderAlbums()}
      </ScrollView>
    </View>
  );
}
