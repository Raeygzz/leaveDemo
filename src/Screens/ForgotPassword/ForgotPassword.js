import React, { Component } from 'react';
import { View } from 'react-native';

import { _ForgotPassword_Form } from '../../Components/Layouts/_ForgotPassword_Form';

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

  }


  forgotPasswordHandler = (value) => {
    // console.log('email ==> ', value);
    this.props.navigation.navigate('ResetLink')
  }


  render() {
    return(
      <View>
        <NinetyNineHeader title="" isHome={false} navigation={this.props.navigation}  />

        <_ForgotPassword_Form onPress={this.forgotPasswordHandler} />
      </View>
    )
  }
}
