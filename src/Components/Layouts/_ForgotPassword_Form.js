import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { Formik } from "formik";

import { NinetyNineHeader } from "../Shared/Headers/NinetyNineHeader";
import { NinetyNineButton } from "../Shared/Buttons/NinetyNineButton";

import { forgotPasswordSchema } from "../../Authentication/Validations/_ForgotPassword_FormValidation";


export class _ForgotPassword_Form extends Component {
  constructor(props) {
    super(props);
    
  }


  render() {
    return (
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={(values, actions) => {
          this.props.onPress(values);
          // actions.resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View>
            <NinetyNineHeader isHome={false} navigation={this.props.navigation} />

            <View style={styles.container}>
              <View style={{ height: 250 }}>
                <Text>&nbsp;</Text>
              </View>

              <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 22 }}>Forgot Password</Text>
              <Text style={{ textAlign: "center" }}>Enter your valid Email</Text>

              <TextInput style={[{ borderColor: touched.email && errors.email ? "red" : null }, styles.textInput]} placeholder="Email" onChangeText={handleChange("email")} value={values.email} onBlur={handleBlur("email")} />

              <View style={styles.buttonContainer}>
                <NinetyNineButton style={styles.ninetyNineButton} buttonTitle="Send Link" onItemPressed={handleSubmit} />
              </View>
            </View>
          </View>
        )}
      </Formik>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  textInput: {
    marginTop: 30,
    padding: 10,
    borderWidth: 2,
    marginBottom: 25
  },
  buttonContainer: {
    width: "50%",
    alignSelf: "center"
  },
  ninetyNineButton: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 30,
    paddingVertical: 20,
    color: "#fff"
  }
});
