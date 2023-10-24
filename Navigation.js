import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./pages/main";
import Login from "./pages/login";
import { useSelector } from "react-redux";
import { selectUser } from "./store/authSlice/authSlice";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const user = useSelector(selectUser);

  return (
    <NavigationContainer>
      {user?.token ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Main} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
