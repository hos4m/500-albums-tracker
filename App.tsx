import React, { useState, useEffect } from "react";
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
import { isOnList, storeAlbum, getAll } from "./utils";

export default function App() {
  // AsyncStorage.clear();
  const [storedAlbums, setStoredAlbums] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    getStoredItems();
  }, []);

  const getStoredItems = async () => {
    const result = await getAll();
    setStoredAlbums(result);
  };

  const albumOnPress = (albumNumber: number) => {
    const currentVal =
      storedAlbums[String(albumNumber)] && JSON.parse(storedAlbums[String(albumNumber)]);
    const newVal = !JSON.parse(currentVal);

    const clone = { ...storedAlbums };
    clone[String(albumNumber)] = JSON.stringify(newVal);
    setStoredAlbums(clone);

    storeAlbum(albumNumber, newVal);
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
      const itemStyles =
        storedAlbums[single.Number] && JSON.parse(storedAlbums[single.Number]) === true
          ? [styles.item, styles.itemOnList]
          : [styles.item];

      return (
        <TouchableHighlight key={single.Number} onPress={() => albumOnPress(single.Number)}>
          <View style={itemStyles}>
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
