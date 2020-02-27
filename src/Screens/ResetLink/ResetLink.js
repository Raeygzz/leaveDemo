import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default class ResetLink extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{ height: 200 }}>
          <Text>&nbsp;</Text>
        </View>

        <Text style={{ textAlign: 'center' }}>Your password reset link has been sent</Text>
        <Text style={{ fontWeight: "bold", textAlign: 'center' }}>Successfully</Text>

        <View style={styles.buttonContainer}>
          <Button title="Continue" onPress={() => this.props.navigation.navigate('Login')} />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  buttonContainer: {
    width: '50%',
    marginTop: 40,
    alignSelf: "center"
  }
})
