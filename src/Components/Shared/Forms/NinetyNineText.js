import React, { Component } from 'react';
import { View, Text } from 'react-native';


export class NinetyNineText extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return(
      <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: 'crimson' }}>{this.props.text}</Text>
      </View>
    )
  }
}
