import React, { Component } from 'react';

import { _ForgotPassword_Form } from '../../Components/Layouts/_ForgotPassword_Form';


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
      <_ForgotPassword_Form onPress={this.forgotPasswordHandler} />
    )
  }
}
