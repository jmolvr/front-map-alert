import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titlePage: {
    fontSize: 17,
    color: "#333333"
  },
  closeIcon: {
    color: "#333333"
  },
  headerButton: {
    backgroundColor: "#6200EE",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 4
  },
  headerButtonText: {
    color: "#ffffff",
    fontSize: 17
  }
});

export default styles;
