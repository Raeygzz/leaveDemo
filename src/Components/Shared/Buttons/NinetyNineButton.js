import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';


export class NinetyNineButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fingerprintValidation: false
    }
  }


  render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity onPress={this.props.onItemPressed} style={styles.buttonContainer}>
          <Text style={this.props.style}>{this.props.buttonTitle}</Text>
        </TouchableOpacity>
        {
          this.state.fingerprintValidation ? <Icon style={styles.icon} name="fingerprint" size={30} color="#900" /> : null
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'blue',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  icon: {
    position: 'absolute',
    color: "#fff",
    top: 48,
    right: 110
  },
})
