import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { Provider } from "react-redux";
import { store } from "./store/store";
import Navigation from "./Navigation";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
