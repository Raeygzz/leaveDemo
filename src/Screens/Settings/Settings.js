import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';


export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  static navigationOptions = {
    headerShown: false
  };


  render() {
    return(
      <View>
        <NinetyNineHeader title="Settings" isHome={true} navigation={this.props.navigation}  />

        <View style={styles.bodyContainer}>
          <Text>I m in Settings</Text>
          <Button title="Finger Print" onPress={() => this.props.navigation.navigate('ResetFingerprint')} />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  bodyContainer: {
    padding: 30,
    marginTop: 80
  }
})
