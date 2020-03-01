import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';

export default class EventDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View>
        <NinetyNineHeader isHome={false} navigation={this.props.navigation}  />

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
