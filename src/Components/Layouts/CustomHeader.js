import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { DrawerActions } from '@react-navigation/native';

export class CustomHeader extends Component {
  render() {
    let { title, isHome } = this.props;
    
    return(
      <View style={[styles.container, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
        <View style={{ position: 'absolute', left: 30, alignSelf: 'center', justifyContent: 'center' }}>
          {
            isHome ?
            <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon name="bars" size={30} color="#900" />
            </TouchableOpacity> :

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="long-arrow-alt-left" size={30} color="#900" />
            </TouchableOpacity>
          }
        </View>
        
        <Text style={styles.header}>{title}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
