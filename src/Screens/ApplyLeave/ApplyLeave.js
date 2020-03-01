import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';


export default class ApplyLeave extends Component {
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
        <NinetyNineHeader title="Apply leave" isHome={true} navigation={this.props.navigation}  />

        <View style={styles.bodyContainer}>
          <Text>I m in Apply leave</Text>
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
