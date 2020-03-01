import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View>
        <NinetyNineHeader isHome={false} navigation={this.props.navigation} />
        <View style={styles.container}>
          <View style={{ height: 250 }}>
            <Text>&nbsp;</Text>
          </View>

          <Text style={{ fontWeight: "bold", textAlign: 'center', fontSize: 22 }}>Forgot Password</Text>
          <Text style={{ textAlign: 'center' }}>Enter your valid Email</Text>

          <TextInput placeholder="Email" style={styles.textInput} />

          <View style={styles.buttonContainer}>
            <Button title="Send Link" onPress={() => this.props.navigation.navigate('ResetLink')} />
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  textInput: {
    marginTop: 30,
    padding: 10,
    borderWidth: 1,
    marginBottom: 25
  },
  buttonContainer: {
    width: '50%',
    alignSelf: "center"
  }
})
