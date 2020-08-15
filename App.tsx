import { StatusBar } from "expo-status-bar";
import React, { Fragment } from "react";
import { StyleSheet, View, ScrollView, StatusBar as StatusBarNative } from "react-native";
// @ts-ignore
import { Text } from "galio-framework";
import data from "./album-list.json";

export default function App() {
  const renderAlbums = () => {
    return data.map((single) => {
      return (
        <Fragment key={single.Number}>
          <Text p style={styles.text}>
            {single.Number} - {single.Album}
          </Text>
        </Fragment>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar hidden />
        {renderAlbums()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },

  scrollView: {
    padding: StatusBarNative.currentHeight,
  },

  text: {
    color: "#FFF",
  },
});
