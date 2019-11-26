import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  inputText: {
    paddingLeft: 30,
    paddingVertical: 20,
    height: 300,
    textAlignVertical: "top",
    fontSize: 18
  },
  addImage: {
    width: Dimensions.get("window").width - 40,
    marginTop: 10,
    marginHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 5,
    borderColor: "#cccccc",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  closeIcon: {
    marginRight: 10,
    color: "#cccccc"
  },
  text: {
    color: "#cccccc",
    marginTop: 10
  }
});

export default styles;
