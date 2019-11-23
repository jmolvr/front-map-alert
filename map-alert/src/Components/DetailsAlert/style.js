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
    backgroundColor: "#cccccc",
    height: 230
  },
  imageShimmer: {
    height: 230,
    width: Dimensions.get("window").width
  },
  about: {
    marginHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  aboutShimmer: {
    height: 100,
    width: Dimensions.get("window").width * 0.75,
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: "center"
  },
  aboutBox: {
    width: 110
  },
  description: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  descriptionTitleShimmer: {
    width: 110,
    height: 16,
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 20
  },
  descriptionTextShimmer: {
    width: Dimensions.get("window").width * 0.9,
    marginBottom: 20,
    height: 60,
    alignSelf: "center",
    borderRadius: 5
  },
  paragraph: {
    fontSize: 16,
    textAlign: "justify"
  }
});

export default styles;
