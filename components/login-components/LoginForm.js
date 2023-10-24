import { View, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = (values) => {
    // You can handle the login logic here
    console.log(values);
  };

  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
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
