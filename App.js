import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navigation from "./Navigation";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
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
