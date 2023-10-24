import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const Main = () => {
  useEffect(() => {
    AsyncStorage.getItem("token");
  }, []);


  const navigation = useNavigation();

  useEffect(() => {
    if (!AsyncStorage.getItem("token")) {
      Stack.navigate("Login");
    }
  }, [ navigation]);


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Main;
