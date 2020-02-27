import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import { CustomHeader } from '../../Components/Layouts/CustomHeader';


export default class Reports extends Component {
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
        <CustomHeader title="Reports" isHome={true} navigation={this.props.navigation}  />

        <View style={styles.bodyContainer}>
          <Text>I m in Reports</Text>
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
