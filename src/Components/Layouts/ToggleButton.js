import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';


export default class ToggleButton extends Component {
  constructor(props) {
    super(props);
    
  }


  render() {
    return (
      <View style = {styles.container}>
        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, styles.container]}>
          <View>
            <Text>{this.props.toggleText}</Text>
          </View>

          <Switch
            onValueChange = {this.props.toggleSwitch}
            value = {this.props.switchValue}
          />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create ({
  container: {
    marginTop: 5,
  }
})
