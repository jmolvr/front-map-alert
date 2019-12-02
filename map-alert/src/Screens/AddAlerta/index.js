import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  View,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Snackbar, Subheading } from "react-native-paper";
import Header from "../../Components/Header";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";

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
    image: null,
    errorAlert: false
  };

  _takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowEditing: false,
      exif: true
    });

    const resizePhoto = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: 300 } }],
      { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG }
    );

    if (!result.cancelled) {
      this.setState({
        image: {
          uri: resizePhoto.uri,
          type: "image/jpeg",
          name: "testando" + Date.now() + ".jpg"
        }
      });
    }
  };

  _pressButtonAddAlert = async () => {
    if (this.state.descricaoText.length !== 0) {
      try {
        const { latitude, longitude } = this.props.region;
        //adicionando form Data
        data = new FormData();
        data.append("image", this.state.image);
        data.append("tipo", "Água");
        data.append("descricao", this.state.descricaoText);
        data.append("local", "DCET");
        data.append("longitude", longitude);
        data.append("latitude", latitude);

        const response = await api.post(`/api/alert/`, data);
        const { handleAddAlert } = this.props;
        handleAddAlert(response.data);
        this.props.navigation.navigate("Home");
      } catch (err) {
        console.error("Erro aos postar alerta - - - ", err);
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

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}
          anabled
        >
          <TouchableOpacity onPress={() => this._takePhoto()}>
            <View style={styles.addImage}>
              <Ionicons
                name={this.state.image ? "ios-checkmark" : "ios-camera"}
                size={38}
                style={styles.closeIcon}
              />
              <Subheading style={styles.text}>
                {this.state.image ? "Imagem Adicionada" : "Adicionar Imagem"}
              </Subheading>
            </View>
          </TouchableOpacity>

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
        </KeyboardAvoidingView>
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
