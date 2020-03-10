import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';


export class _Events_ListItem extends Component {
  render() {
    console.log('this.props  ==> ', this.props);

    const date = new Date(this.props.listItem.startDate);
    const dayNum = date.getDay();
    const day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"][dayNum];


    return (
      <View style={[{backgroundColor: 'pink'}, styles.listView]}>
        {/* <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.props.listItem.detail}</Text> */}
        {
          this.props.listItem.id ? <Text dangerouslySetInnerHTML={{__html: this.props.listItem.detail }} ></Text> : null
        }
        <Text style={{ fontSize: 12 }}>{this.props.listItem.startDate.slice(8, 10) + ' ' + day + ',  ' + this.props.listItem.startDate.slice(0, 4)}</Text>
      </View>
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
