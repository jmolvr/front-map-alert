import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as AppProvider } from "react-native-paper";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigation/AppNavigator";
import Store from "./src/store";

export default function App() {
  return (
    <Provider store={Store}>
      <AppProvider>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </AppProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBFD"
  }
});
