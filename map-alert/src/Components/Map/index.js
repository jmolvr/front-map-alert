import React from "react";
import styles from "./style";
import { Platform, View } from "react-native";
import MapView, { Marker, UrlTile, MAP_TYPES } from "react-native-maps";
import { connect } from "react-redux";
import Modal from "react-native-modal";

import DetailsAlert from "../DetailsAlert";

import { bindActionCreators } from "redux";
import { handleAlertDetails } from "../../actions";

class Map extends React.Component {
  constructor() {
    super();
    this.mapRef = null;
  }
  state = {
    activeModal: false
  };
  render() {
    const { alerts, region } = this.props;
    const { handleAlertDetails } = this.props;

    return (
      <View>
        <MapView
          style={styles.mapStyle}
          region={region}
          provider={null}
          minZoomLevel={16}
          ref={(ref) => this.mapRef = ref}
          onLayout={() => this.mapRef.setMapBoundaries(
            { latitude: 0.0016, longitude: -51.0823 },
            { latitude: -0.00998, longitude: -51.08885 }
          )}
          mapType={
            Platform.OS == "android" ? MAP_TYPES.NONE : MAP_TYPES.STANDARD
          }
          rotateEnabled={false}
          showsUserLocation
        >
          <UrlTile urlTemplate="https://c.osm.rrze.fau.de/osmhd/{z}/{x}/{y}.png" />

          {alerts.map((alert, index) => (
            <Marker
              onPress={() => {
                handleAlertDetails(alert.id);
                this.setState({ activeModal: true });
              }}
              key={index}
              coordinate={{
                latitude: alert.latitude,
                longitude: alert.longitude
              }}
              pinColor='#6200ee'
              flat={true}
            />
          ))}
        </MapView>
        {}
        <Modal
          isVisible={this.state.activeModal}
          useNativeDriver
          style={styles.modalContainer}
          onBackButtonPress={() => this.setState({ activeModal: false })}
          onBackdropPress={() => this.setState({ activeModal: false })}
          onSwipeComplete={() => this.setState({ activeModal: false })}
        >
          <View style={styles.modal}>
            <DetailsAlert
              closeModal={() => this.setState({ activeModal: false })}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = store => ({
  alerts: store.alerts,
  region: store.region,
  alertDetails: store.alertDetails
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleAlertDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
