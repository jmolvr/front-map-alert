import React from "react";
import styles from "./style";
import { View, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Paragraph, Title, Subheading } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

class DetailsAlert extends React.Component {
  render() {
    // id do alerta aberto
    const { alertDetails } = this.props;
    return (
      <>
        <View style={styles.header}>
          <View>
            <TouchableWithoutFeedback
              onPress={this.props.closeModal}
              hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}
            >
              <Ionicons name="ios-close" size={35} />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Title style={styles.title}>Detalhes</Title>
          </View>
          <View />
        </View>

        <ScrollView>
          <View style={styles.image}></View>

          <View style={styles.about}>
            <View style={styles.aboutBox}>
              <Title style={styles.title}>Local</Title>
              <Subheading ellipsizeMode="tail" numberOfLines={1}>
                Bloco de Ciência da computação e enegenharia eletrica
              </Subheading>
            </View>
            <View style={styles.aboutBox}>
              <Title style={styles.title}>Categoria</Title>
              <Subheading>Água</Subheading>
            </View>
          </View>

          <View style={styles.description}>
            <Title style={styles.title}>Descrição</Title>
            <Paragraph style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              blandit leo tortor, in tempor elit luctus eget. Nullam dapibus
              lobortis condimentum. Duis pretium eu leo id egestas. Suspendisse
              euismod vehicula nisi, quis dictum neque rutrum at. Pellentesque
            </Paragraph>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = store => ({
  alertDetails: store.alertDetails
});

export default connect(mapStateToProps)(DetailsAlert);
