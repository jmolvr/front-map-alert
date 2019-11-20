import React from "react";
import { Portal, FAB } from "react-native-paper";

export default class FabAdicionar extends React.Component {
  state = {
    fabOpen: false
  };

  render() {
    return (
      <Portal>
        <FAB.Group
          open={this.state.fabOpen}
          icon={"plus"}
          actions={[
            {
              icon: "map-marker-plus",
              label: "Adicionar Alerta",
              onPress: this.props.buttonAddAlerta
            }
          ]}
          onStateChange={({ open }) => this.setState({ fabOpen: open })}
        />
      </Portal>
    );
  }
}
