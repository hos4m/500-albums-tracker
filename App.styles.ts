import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingTop: (StatusBar.currentHeight || 0) * 1.5,
  },

  introView: {
    padding: 10,
  },

  introText: {
    color: "#FFF",
    textAlign: "center",
    marginBottom: 5,
  },

  introTextLine1: {
    fontSize: 18,
    fontWeight: "bold",
  },

  introTextLine2: {
    fontSize: 16,
    color: "#999",
  },

  item: {
    marginBottom: 10,
    padding: 15,
  },

  itemOnList: {
    opacity: 0.5,
  },

  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  albumNumber: {
    color: "#FFB399",
    paddingRight: 5,
  },

  meta: {
    color: "#FFF",
    opacity: 0.8,
  },

  link: {
    color: "#E666B3",
    textDecorationLine: "underline",
  },
});

export default styles;
