import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./pages/main";
import Login from "./pages/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {!AsyncStorage.getItem("token") ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Main} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;