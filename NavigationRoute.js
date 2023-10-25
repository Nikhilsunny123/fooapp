import {NavigationContainer, StackNavigator} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './pages/main';
import Login from './pages/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const NavigationRoute = () => {
  const Stack = createNativeStackNavigator();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const token = await AsyncStorage?.getItem('token');
      setIsAuthenticated(token !== null);
    }

    checkAuthentication();
  }, []);
  console.log('navigation');
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Main} />
         
        </Stack.Navigator>
      ) : (
        <StackNavigator>
          <Stack.Screen name="Login" component={Login} />
        </StackNavigator>
      )}
    </NavigationContainer>
  );
};

export default NavigationRoute;
