import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import loginServices from "../../services/auth.services";
import { useMutation } from "react-query";
import { useState } from "react";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const mutation = useMutation(loginServices.loginService, {
    onSuccess: (data) => {
      console.log("Item changed successfully:", data);
    },
    onError: (error) => {
      const responce = error;
      console.error(responce.message);
      if (responce?.response?.status === 500) {
        setErrorMessage(responce?.response?.data.message);
      } else {
        console.log(error);
        setErrorMessage("network Error");
      }
    },
  });

  const handleLogin = (values) => {
    // You can handle the login logic here
    mutation.mutate(values);
    console.log(values);
  };

  return (
    <View style={styles.loginContainer}>
      <Formik
        initialValues={{ email: "", password: "", role: "user" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Text>Email:</Text>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && <Text>{errors.email}</Text>}

            <Text>Password:</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}

            <Button onPress={handleSubmit} title="Login" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

 const styles = StyleSheet.create({
  loginContainer: {
    width:"50%",
    display: "flex",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
