import React from "react";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { ActivityIndicator, Text } from "react-native-paper";
import { View } from "react-native";
import Map from "../../Components/Map";
import FabAdicionar from "../../Components/FabAdicionar";

import api from "../../services/api";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleAlertInfo } from '../../actions'

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    region: null,
    loadingStatus: ""
  };

  _getOpenAlerts = async () => {
    try {
      this.setState({ loadingStatus: "Carregando Alertas" });

      const response = await api.get(`/api/alert/`);
      const dados = response.data;
      const { handleAlertInfo } = this.props;
      handleAlertInfo(dados);
    } catch (err) {
      console.error("Erro fetching data --------", err);
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

    this.setState({
      region: {
        latitude,
        longitude,
        latitudeDelta: 0.0922 / 30,
        longitudeDelta: 0.0421 / 30
      }
    });
  };

  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => this._getOpenAlerts());

    this._getCurrentLocation();
    this._getOpenAlerts();
  }

  render() {
    const { alerts } = this.props;
    if (!this.state.region || !alerts) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating={true} size="large" />
          <Text>{this.state.loadingStatus}</Text>
        </View>
      );
    }

    return (
      <>
        <Map
          currentLocation={this.state.region}
        />
        <FabAdicionar
          buttonAddAlerta={() => {
            this._getCurrentLocation();
            this.props.navigation.navigate("AddAlerta", {
              region: this.state.region
            })
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
const mapDispatchToProps = dispatch => bindActionCreators({ handleAlertInfo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
