import React from "react";
import { View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import styles from "./style";

export default function LoadingModal(props) {
  return (
    <View style={styles.container}>
      <View>
        <ActivityIndicator animating={true} size="large" color="#6200EE" />
      </View>
      <View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );
}
