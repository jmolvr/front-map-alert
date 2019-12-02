import { StyleSheet, Dimensions } from "react-native";

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
    height: 230,
    resizeMode: "contain",
    backgroundColor: "#f3f3f3"
  },
  imageShimmer: {
    height: 230,
    width: Dimensions.get("window").width
  },
  about: {
    marginHorizontal: 20,
    paddingVertical: 20
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
