import React, { useState, useEffect } from "react";
import {
  View,
  Text as TextNative,
  TouchableHighlight,
  SafeAreaView,
  FlatList,
  Linking,
  AsyncStorage,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// @ts-ignore
import { Text } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

import data from "./album-list.json";
import styles from "./App.styles";
import { storeAlbum, getAll } from "./utils";
import { Album } from "./types";

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
    const newVal = currentVal ? !JSON.parse(currentVal) : true;

    const clone = { ...storedAlbums };
    clone[String(albumNumber)] = JSON.stringify(newVal);
    setStoredAlbums(clone);

    storeAlbum(albumNumber, newVal);
  };

  const openLink = () => {
    const URL =
      "https://www.rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/";
    Linking.openURL(URL).catch((err) => console.error("An error occurred", err));
  };

  const renderIntro = () => {
    return (
      <View style={styles.introView}>
        <Text style={[styles.introText, styles.introTextLine1]}>
          Hey! this is the list of the 500 Greatest Albums of All Time created by{" "}
          <TextNative style={styles.link} onPress={openLink}>
            RollingStone
          </TextNative>
        </Text>
        <Text style={[styles.introText, styles.introTextLine2]}>
          You can use this app to track your progress. Click on an album to mark it as done or
          undone!
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Album }) => {
    const albumNumber = String(item.Number).padStart(3, "0");
    const itemStyles =
      storedAlbums[item.Number] && JSON.parse(storedAlbums[item.Number])
        ? [styles.item, styles.itemOnList]
        : [styles.item];

    return (
      <TouchableHighlight key={item.Number} onPress={() => albumOnPress(item.Number)}>
        <LinearGradient
          colors={["#FF6633", "#3366E6"]}
          start={[0, 1]}
          end={[1, 0]}
          style={itemStyles}
        >
          <Text style={styles.text}>
            <TextNative style={styles.albumNumber}>{albumNumber}</TextNative> {item.Album}
          </Text>
          <Text style={styles.meta}>
            By {item.Artist} &#8226; {item.Genre} &#8212; {item.Year}
          </Text>
        </LinearGradient>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#333" />
      {renderIntro()}
      <FlatList
        data={data as Album[]}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.Number)}
      />
    </SafeAreaView>
  );
}
