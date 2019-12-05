import { StyleSheet, Dimensions } from "react-native";

const defaultAddImage = {
  width: Dimensions.get("window").width - 40,
  marginTop: 10,
  marginHorizontal: 20,
  paddingVertical: 7,
  justifyContent: "center",
  borderRadius: 5,
  borderWidth: 1,
  flexDirection: "row"
};

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
  defaultAddImage: {
    width: Dimensions.get("window").width - 40,
    marginTop: 10,
    marginHorizontal: 20,
    paddingVertical: 7,
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row"
  },
  defaultImageIcon: {
    marginRight: 10,
    color: "#cccccc"
  },
  defaultImageText: {
    color: "#cccccc",
    marginTop: 10
  }
});

export default styles;
