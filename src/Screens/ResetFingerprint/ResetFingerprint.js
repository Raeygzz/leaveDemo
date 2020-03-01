import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { CustomHeader } from '../../Components/Layouts/Headers/CustomHeader';


export default class ResetFingerprint extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  
  render() {
    return (
      <View>
        <CustomHeader title="Reset Finger Print" isHome={false} navigation={this.props.navigation}  />

        <View style={styles.bodyContainer}>
          <Text>I m in Reset Finger Print</Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  bodyContainer: {
    padding: 30,
  }
})
