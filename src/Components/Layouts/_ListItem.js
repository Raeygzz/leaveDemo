import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';


export class _ListItem extends Component {
  render() {
    // console.log('this.props  ==> ', this.props);

    const date = new Date(this.props.title.date);
    const dayNum = date.getDay();
    const day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"][dayNum];

    return (
      <ScrollView>
        <View style={[{ backgroundColor: this.props.title.backgroundColor ? this.props.title.backgroundColor : "lightgrey", marginBottom: 8, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 15 }, styles.listView]}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={{ position: 'absolute', right: 65, borderRadius: 100, padding: 4, backgroundColor: '#fff' }}>
              <Text style={{ textAlign: 'center' }}>{this.props.title.date.slice(8, 10)}</Text>
              <Text style={{ textAlign: 'center' }}>{day}</Text>
            </View>

            <View>
              <Text style={styles.text}>check in</Text>
              <Text style={styles.text}>{this.props.title.checkIn}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.text}>check out</Text>
            <Text style={styles.text}>{this.props.title.checkOut ? this.props.title.checkOut : 'n/a'}</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  listView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
})
