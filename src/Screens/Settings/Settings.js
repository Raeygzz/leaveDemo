import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { CustomHeader } from '../../Components/Layouts/Headers/CustomHeader';


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
        <CustomHeader title="Settings" isHome={true} navigation={this.props.navigation}  />

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
