import React from "react";
// import styles from "./style";
import { Text } from "react-native";
import { connect } from "react-redux";

class DetailsAlert extends React.Component {
  render() {
    const { alertDetails } = this.props;

    return <Text>{alertDetails}</Text>;
  }
}

const mapStateToProps = store => ({
  alertDetails: store.alertDetails
});

export default connect(mapStateToProps)(DetailsAlert);
