import React from "react";
import styles from "./style";
import {
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Image
} from "react-native";
import { Paragraph, Title, Subheading } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateCurrentLocation } from "../../actions";

class DetailsAlert extends React.Component {
  state = {
    currentAlert: null
  };

  async _getAlertOpen() {
    try {
      const { alertDetails, alerts } = this.props;

      let findAlert = null;
      findAlert = alerts.find(alert => alert.id === alertDetails);

      const { updateCurrentLocation } = this.props;
      updateCurrentLocation({
        latitude: findAlert.latitude,
        longitude: findAlert.longitude
      });

      this.setState({ currentAlert: findAlert });
    } catch (err) {
      console.log("Fetch error data -------", err);
    }
  }

  componentDidMount() {
    this._getAlertOpen();
  }

  render() {
    if (!this.state.currentAlert) {
      return <View />;
    }

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
          <View style={styles.image}>
            <Image
              style={styles.image}
              source={{ uri: this.state.currentAlert.image }}
            />
          </View>

          <View style={styles.about}>
            <View style={styles.aboutBox}>
              <Title style={styles.title}>Local</Title>
              <Subheading ellipsizeMode="tail" numberOfLines={1}>
                {this.state.currentAlert.local.nome}
              </Subheading>
            </View>
            <View style={styles.aboutBox}>
              <Title style={styles.title}>Categoria</Title>
              <Subheading>{this.state.currentAlert.tipo.nome}</Subheading>
            </View>
          </View>

          <View style={styles.description}>
            <Title style={styles.title}>Descrição</Title>
            <Paragraph style={styles.paragraph}>
              {this.state.currentAlert.descricao}
            </Paragraph>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = store => ({
  alertDetails: store.alertDetails,
  alerts: store.alerts
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCurrentLocation }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DetailsAlert);
