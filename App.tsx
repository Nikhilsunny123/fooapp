import {StyleSheet, SafeAreaView} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {store} from './store/store';
import NavigationRoute from './NavigationRoute';

export default function App() {
  const queryClient = new QueryClient();
  console.log("home page")
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationRoute />
        </QueryClientProvider>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
