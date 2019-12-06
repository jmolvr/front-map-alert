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
import LoadingModal from "../../Components/LoadingModal";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
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
    localText: "",
    errorMessage: "",
    image: null,
    addImageMessage: "empty",
    errorAlert: false,
    activeModal: false
  };

  _takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowEditing: false,
      exif: true
    });

    if (!result.cancelled) {
      const resizePhoto = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 300 } }],
        { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG }
      );
      this.setState({
        image: {
          uri: resizePhoto.uri,
          type: "image/jpeg",
          name: "img" + Date.now() + ".jpg"
        },
        addImageMessage: "added"
      });
    }
  };

  _pressButtonAddAlert = async () => {
    const { descricaoText, localText } = this.state;
    if (descricaoText.length !== 0 || localText.length !== 0) {
      try {
        this.setState({ activeModal: true });
        const { latitude, longitude } = this.props.region;

        data = new FormData();
        data.append("image", this.state.image);
        data.append("tipo", "Água");
        data.append("descricao", this.state.descricaoText);
        data.append("local", this.state.localText);
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
        errorMessage: "Você precisa inserir os dados",
        errorAlert: true
      });
    }
  };

  addStyleImage() {
    switch (this.state.addImageMessage) {
      case "empty":
        return { borderColor: "#cccccc", color: "#cccccc" };
      case "added":
        return { borderColor: "#6200EE", color: "#6200EE" };
      default:
        return { borderColor: "#cccccc", color: "#cccccc" };
    }
  }

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
            <View style={[styles.defaultAddImage, this.addStyleImage()]}>
              <Ionicons
                name={this.state.image ? "ios-checkmark" : "ios-camera"}
                size={38}
                style={[styles.defaultImageIcon, this.addStyleImage()]}
              />
              <Subheading
                style={[styles.defaultImageText, this.addStyleImage()]}
              >
                {this.state.image ? "Imagem Adicionada" : "Adicionar Imagem"}
              </Subheading>
            </View>
          </TouchableOpacity>

          <TextInput
            placeholder="Local (Ex: Bloco K, DEPLA, DCET)"
            onChangeText={text => this.setState({ localText: text })}
            value={this.state.localText}
            autoFocus={true}
            style={styles.inputText}
          />

          <TextInput
            placeholder="Descreva o problema"
            editable
            multiline
            numberOfLines={10}
            onChangeText={text => this.setState({ descricaoText: text })}
            value={this.state.descricaoText}
            style={styles.descriptionText}
          />
        </KeyboardAvoidingView>

        <Modal
          isVisible={this.state.activeModal}
          useNativeDriver
          style={{ margin: 0 }}
          onBackButtonPress={() => this.setState({ activeModal: false })}
          onBackdropPress={() => this.setState({ activeModal: false })}
          onSwipeComplete={() => this.setState({ activeModal: false })}
        >
          <LoadingModal text="Adicionando Alerta" />
        </Modal>

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
