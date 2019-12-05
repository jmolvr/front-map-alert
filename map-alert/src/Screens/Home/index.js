import React from "react";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { ActivityIndicator, Text } from "react-native-paper";
import { View } from "react-native";
import styles from "./style";

import LoadingModal from "../../Components/LoadingModal";
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
    ws: null
  };

  timeout = 250;
  connectInterval;
  _websocket = () => {
    var ws = new WebSocket(
      "ws://mapalertunifapapi.herokuapp.com/ws/alertas/unsolved/"
    );
    let that = this;

    ws.onopen = event => {
      this.setState({ ws: ws });
      that.timeout = 250;
      clearTimeout(this.connectInterval);
    };

    ws.onmessage = event => {
      let data = JSON.parse(event.data);
      const { handleAlertInfo } = this.props;
      this._getOpenAlerts();
    };

    ws.onclose = event => {
      that.timeout = that.timeout + that.timeout;
      this.connectInterval = setTimeout(
        this.check,
        Math.min(5000, that.timeout)
      );
    };
  };

  check = () => {
    const { ws } = this.state;
    let isFocused = this.props.navigation.isFocused();
    if (!ws || ws.readyState == WebSocket.CLOSED || isFocused)
      this._websocket();
  };

  _getOpenAlerts = async () => {
    try {
      const data = await getAlerts();

      const { handleAlertInfo } = this.props;
      handleAlertInfo(data);
    } catch (err) {
      console.error("Erro na inicialização", err);
    }
  };

  _getCurrentLocation = async () => {
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
    this.subs = [
      this.props.navigation.addListener("didFocus", payload =>
        this.componentDidFocus(payload)
      ),
      this.props.navigation.addListener("willBlur", payload =>
        this.componentWillBlur(payload)
      )
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    clearTimeout(this.connectInterval);
  }

  componentWillBlur() {
    this.state.ws.close();
    clearTimeout(this.connectInterval);
  }

  componentDidFocus() {
    this._getCurrentLocation();
    this._getOpenAlerts();
    this._websocket();
  }

  render() {
    const { alerts, region } = this.props;

    const loadMap =
      !region || !alerts ? (
        <View style={styles.loadingMapContainer}>
          <LoadingModal text="Carregando alertas" />
        </View>
      ) : (
        <Map />
      );

    return (
      <>
        {loadMap}
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
