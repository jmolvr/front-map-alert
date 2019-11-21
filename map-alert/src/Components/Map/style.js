import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  loadingMap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 100
  },
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end"
  },
  modal: {
    backgroundColor: "#ffffff",
    maxHeight: Dimensions.get("window").height,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20
  }
});

export default styles;
