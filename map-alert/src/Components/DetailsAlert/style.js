import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 7,
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 17,
    color: "#333333"
  },
  image: {
    backgroundColor: "#cccccc",
    height: 230
  },
  about: {
    marginHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  aboutBox: {
    width: 110
  },
  description: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  paragraph: {
    fontSize: 16,
    textAlign: "justify"
  }
});

export default styles;
