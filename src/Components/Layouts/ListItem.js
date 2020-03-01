import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class ListItem extends Component {
  render() {
    const date = new Date(this.props.title.date);
    const dayNum = date.getDay();
    const day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"][dayNum];

    return (
      <View style={{ marginBottom: 8, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'lightgrey', padding: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={{ position: 'absolute', right: 65, borderRadius: 100, padding: 4, backgroundColor: '#fff' }}>
            <Text style={{ textAlign: 'center' }}>{this.props.title.date.slice(8, 10)}</Text>
            <Text style={{ textAlign: 'center' }}>{day}</Text>
          </View>

          <View>
            <Text>check in</Text>
            <Text>{this.props.title.checkIn}</Text>
          </View>
        </View>

        <View>
          <Text>check out</Text>
          <Text>{this.props.title.checkOut ? this.props.title.checkOut : 'n/a'}</Text>
        </View>
      </View>
    )
  }
}
