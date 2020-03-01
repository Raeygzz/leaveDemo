import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';


export default class ResetFingerprint extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  
  render() {
    return (
      <View>
        <NinetyNineHeader title="Reset Finger Print" isHome={false} navigation={this.props.navigation}  />

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
