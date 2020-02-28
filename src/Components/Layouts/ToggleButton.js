import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';


export default class ToggleButton extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ marginLeft: 10 }}>{this.props.toggleText}</Text>
        </View>

        <Switch
          style={{ marginRight: 10 }}
          onValueChange = {this.props.toggleSwitch}
          value = {this.props.switchValue}
        />
      </View>
    )
  }
}
