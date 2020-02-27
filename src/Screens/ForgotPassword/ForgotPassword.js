import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", textAlign: 'center' }}>Forgot Password</Text>

        <View style={{ height: 200 }}>
          <Text>&nbsp;</Text>
        </View>

        <TextInput placeholder="Email" style={styles.textInput} />

        <View style={styles.buttonContainer}>
          <Button title="Send Link" onPress={() => this.props.navigation.navigate('ResetLink')} />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  textInput: {
    borderBottomWidth: 1,
    marginBottom: 40
  },
  buttonContainer: {
    width: '50%',
    alignSelf: "center"
  }
})
