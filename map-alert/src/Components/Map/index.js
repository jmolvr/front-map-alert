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
          mapType={
            Platform.OS == "android" ? MAP_TYPES.NONE : MAP_TYPES.STANDARD
          }
          rotateEnabled={false}
          showsUserLocation
        >
          <UrlTile urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {alerts.map(alert => (
            <Marker
              onPress={() => {
                handleAlertDetails(alert.id);
                this.setState({ activeModal: true });
              }}
              key={alert.id}
              coordinate={{
                latitude: alert.latitude,
                longitude: alert.longitude
              }}
            />
          ))}
        </MapView>

        <Modal
          isVisible={this.state.activeModal}
          useNativeDriver
          style={styles.modalContainer}
          onBackButtonPress={() => this.setState({ activeModal: false })}
          onBackdropPress={() => this.setState({ activeModal: false })}
          onSwipeComplete={() => this.setState({ activeModal: false })}
        >
          <View style={styles.modal}>
            <DetailsAlert />
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
