import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  loadingMap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end"
  },
  modal: {
    backgroundColor: "#ffffff",
    height: 300
  }
});

export default styles;
