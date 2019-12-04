import React from "react";
import { FAB } from "react-native-paper";
import styles from "./style";

export default function FabAdicionar(props) {
  return <FAB style={styles.fab} icon="plus" onPress={props.buttonAddAlerta} />;
}
