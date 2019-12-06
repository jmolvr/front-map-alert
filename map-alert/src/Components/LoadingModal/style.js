import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    width: Dimensions.get("window").width * 0.75,
    borderRadius: 5
  },
  text: {
    marginLeft: 20,
    fontSize: 17
  }
});

export default styles;
