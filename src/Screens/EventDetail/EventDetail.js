import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { CustomHeader } from '../../Components/Layouts/CustomHeader';

export default class EventDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View>
        <CustomHeader isHome={false} navigation={this.props.navigation}  />

        <View style={styles.bodyContainer}>
          <Text>I m in Event Detail</Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  bodyContainer: {
    padding: 30
  }
})
