import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export class _Events_ListItem extends Component {
  constructor(props) {
    super(props);

  }

  openEventDetail = (id) => {
    this.props.navigation.navigate('EventDetail', { eventId: id });
  }


  render() {
    // console.log('this.props  ==> ', this.props);

    const date = new Date(this.props.listItem.startDate);
    const dayNum = date.getDay();
    const day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"][dayNum];

    return (
      <TouchableOpacity style={[{backgroundColor: 'pink'}, styles.listView]} onPress={this.openEventDetail.bind(this, this.props.listItem.id)}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.props.listItem.title + ' = ' + this.props.listItem.type}</Text>
        <Text style={{ fontSize: 12 }}>{this.props.listItem.startDate.slice(8, 10) + ' ' + day + ',  ' + this.props.listItem.startDate.slice(0, 4)}</Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  listView: { 
    padding: 20, 
    marginTop: 15, 
    borderWidth: 1,
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    borderBottomRightRadius: 20, 
  }
})
