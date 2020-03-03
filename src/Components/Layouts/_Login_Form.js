import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { NinetyNineToggleButton } from '../Shared/Forms/NinetyNineToggleButton';
import { NinetyNineButton } from '../Shared/Buttons/NinetyNineButton';
import { NinetyNineText } from '../Shared/Forms/NinetyNineText';

import { loginSchema } from '../../Authentication/Validations/_Login_FormValidation';
import { Formik } from 'formik';

import { connect } from 'react-redux';


class _Login_Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
    }
  }


  toggleSwitch = (value) => {
    this.setState({
      switchValue: value
    })
  }


  render() {
    // console.log('this.props.errorMsg  ==> ', this.props.errorMsg);

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',

          // company_id = 1
          // email: 'pratik.sangami@cloudyfox.com',
          // password: '3PvyS%&GTo',

          // email: 'regan.timsina@cloudyfox.com',
          // password: 'k5UYpfSovr',


          // company_id = 2
          email: 'bijay@gmail.com',
          password: 'password',

          // email: 'biplab@gmail.com',                                    // comapy_id = 5
          // password: 'password@2',

          // email: 'testuser1@yopmail.com',
          // password: 'password',

          // email: 'mobile@gmail.com',
          // password: 'password',

          // email: 'testuser2@yopmail.com',
          // password: 'password',

          // email: 'testuser3@yopmail.com',
          // password: 'password',

          // email: 'ajay@gmail.com',
          // password: 'password',

          // email: 'rohit@gmail.com',
          // password: '^&ykdJ%a2C',

          // email: 'angel@gmail.com',
          // password: 'password',

          // email: 'mobile1@gmail.com',
          // password: 'password',

          // email: 'mobile2@gmail.com',
          // password: 'password',

          // email: 'mobile3@gmail.com',
          // password: 'password',
        }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          this.props.onPress(values);
          // actions.resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput style={[{ borderColor: touched.email && errors.email ? 'red' : null }, styles.textInput1]} placeholder="Username" onChangeText={handleChange('email')} value={values.email} onBlur={handleBlur('email')} />
            {/* <Text>{touched.email && errors.email}</Text> */}

            <TextInput secureTextEntry={true} style={[{ borderColor: touched.password && errors.password ? 'red' : null }, styles.textInput2]} placeholder="Password" onChangeText={handleChange('password')} value={values.password} onBlur={handleBlur('password')} />
            {/* <Text>{touched.password && errors.password}</Text> */}

            {
              this.props.errorMsg.error != '' ? <NinetyNineText text={this.props.errorMsg.error ? this.props.errorMsg.error : null} /> : null
            }

            <View>
              <NinetyNineToggleButton
                toggleSwitch={this.toggleSwitch}
                switchValue={this.state.switchValue}
                toggleText='Remember Me'
              />
            </View>
            
            <View style={{ marginTop: 40, marginRight: 10 }}>
              <NinetyNineButton style={styles.ninetyNineButton} buttonTitle="Login" onItemPressed={handleSubmit} /> 
            </View>
            
            <TouchableOpacity style={{ marginTop: 5 }} onPress={this.forgotPassword}>
              <Text style={{ color: 'blue', textAlign: 'center' }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    )
  }
}


const styles = StyleSheet.create({
  textInput1: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 15,
    elevation: 1
  },
  textInput2: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 5,
    elevation: 1
  },
  ninetyNineButton: {
    fontSize: 18, 
    fontWeight: 'bold', 
    paddingHorizontal: 60, 
    paddingVertical: 20, 
    color: '#fff'
  }
})


const mapStateToProps = state => {
  return {
    errorMsg: state.login
  } 
}

export default connect(mapStateToProps)(_Login_Form);
