import React from "react";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { ActivityIndicator, Text } from "react-native-paper";
import { View } from "react-native";
import styles from "./style";

import Map from "../../Components/Map";
import FabAdicionar from "../../Components/FabAdicionar";

import { getAlerts } from "../../services/newapi";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAlertInfo, updateCurrentLocation } from "../../actions";

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    loadingStatus: ""
  };

  _websocket = () => {

    let ws = new WebSocket("ws://192.168.1.102:8000/ws/alertas/");
    ws.onopen = event => {
      console.log("WebSocket conectado");
    }

    ws.onmessage = event => {
      let data = JSON.parse(event.data);
      console.log("Dados do ws - - -", data);
      const { handleAlertInfo } = this.props;
      handleAlertInfo(data.payload);
    }

    ws.onclose = event => {
      console.log("WS fechado");
    }
  }
  _getOpenAlerts = async () => {
    try {
      this.setState({ loadingStatus: "Carregando Alertas" });
      const data = await getAlerts();
      const { handleAlertInfo } = this.props;
      handleAlertInfo(data);
    } catch (err) {
      console.error("Erro na inicialização", err);
    }
  };

  _getCurrentLocation = async () => {
    this.setState({ loadingStatus: "Carregando sua localização" });

    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      return console.log("Permissão negada!");
    }

    const {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync({});
    const { updateCurrentLocation } = this.props;

    updateCurrentLocation({
      latitude: latitude,
      longitude: longitude
    });
  };

  componentDidMount() {
    this._getCurrentLocation();
    this._getOpenAlerts();
    this._websocket();
  }

  render() {
    const { alerts, region } = this.props;

    if (!region || !alerts) {
      return (
        <View style={styles.loadingMapContainer}>
          <ActivityIndicator animating={true} size="large" />
          <Text style={styles.loadingMapText}>{this.state.loadingStatus}</Text>
        </View>
      );
    }

    return (
      <>
        <Map />
        <FabAdicionar
          buttonAddAlerta={() => {
            this._getCurrentLocation();
            this.props.navigation.navigate("AddAlerta");
          }}
        />
      </>
    );
  }
}

const mapStateToProps = store => ({
  alerts: store.alerts,
  region: store.region
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleAlertInfo, updateCurrentLocation }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
