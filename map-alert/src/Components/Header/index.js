import React from "react";
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Title, Paragraph } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

export default function Header(props) {
  return (
    <View style={styles.header}>
      <View>
        <TouchableWithoutFeedback
          onPress={props.buttonHeaderLeft}
          hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}
        >
          <Ionicons name="ios-close" size={35} style={styles.closeIcon} />
        </TouchableWithoutFeedback>
      </View>
      <View>
        <Title style={styles.titlePage}>{props.titlePage}</Title>
      </View>
      <View>
        <TouchableOpacity
          onPress={props.buttonHeaderRight}
          style={styles.headerButton}
        >
          <Paragraph style={styles.headerButtonText}>Adicionar</Paragraph>
        </TouchableOpacity>
      </View>
    </View>
  );
}
