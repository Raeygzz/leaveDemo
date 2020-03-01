import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';


export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <View>
        <NinetyNineHeader title="Events/Announcement" isHome={true} navigation={this.props.navigation}  />

        <View style={styles.bodyContainer}>
          <Text>I m in Events</Text>
          <Button title="Events Detail" onPress={() => this.props.navigation.navigate('EventDetail')} />
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
