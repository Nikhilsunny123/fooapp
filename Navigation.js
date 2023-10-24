import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./pages/main";
import Login from "./pages/login";
import { useSelector } from "react-redux";
import { selectUser } from "./store/authSlice/authSlice";
import { useEffect } from "react";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  // const checkIfUserIsAuthenticated = () => {
  //   if (localStorage.getItem("token")) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  useEffect(() => {
    if (!user.authenticated) {
      navigate("/login");
    }
  }, [user]);

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
