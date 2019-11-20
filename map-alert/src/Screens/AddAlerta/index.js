import React from "react";
import { TextInput } from "react-native";
import { Snackbar } from "react-native-paper";
import Header from "../../Components/Header";
import styles from "./styles";

import api from "../../services/api";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddAlert } from "../../actions";

class AddAlerta extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    descricaoText: "",
    errorMessage: "",
    errorAlert: false
  };

  _pressButtonAddAlert = async () => {
    if (this.state.descricaoText.length !== 0) {
      try {
        const { latitude, longitude } = this.props.region;

        const response = await api.post(`/api/alert/`, {
          local: "DCET",
          tipo: "Água",
          descricao: this.state.descricaoText,
          longitude: longitude,
          latitude: latitude,
          status: 0
        });
        const { handleAddAlert } = this.props;
        handleAddAlert(response.data);
        this.props.navigation.navigate("Home");
      } catch (err) {
        console.error("Erro ao adicionar alerta------", err);
      }
    } else {
      this.setState({
        errorMessage: "Você precisa descrever o problema",
        errorAlert: true
      });
    }
  };

  render() {
    return (
      <>
        <Header
          titlePage=""
          buttonHeaderLeft={() => this.props.navigation.goBack()}
          buttonHeaderRight={this._pressButtonAddAlert}
        />

        <TextInput
          placeholder="Descreva o problema"
          editable
          multiline
          numberOfLines={10}
          onChangeText={text => this.setState({ descricaoText: text })}
          value={this.state.descricaoText}
          style={styles.inputText}
          autoFocus={true}
        />

        <Snackbar
          visible={this.state.errorAlert}
          onDismiss={() => this.setState({ errorAlert: false })}
          duration={7000}
        >
          {this.state.errorMessage}
        </Snackbar>
      </>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleAddAlert }, dispatch);
const mapStateToProps = store => ({
  alerts: store.alerts,
  region: store.region
});
export default connect(mapStateToProps, mapDispatchToProps)(AddAlerta);
