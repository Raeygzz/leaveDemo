import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';


export class NinetyNineLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false
    }
  }


  // static getDerivedStateFromProps(props, state) {debugger
  //   if(props.isLoading) {
  //     return true;
  //   } 
  //   if(state.loader) {
  //     return true
  //   }
  //   return null
  // }


  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.isLoading == nextProps.isLoading) {
  //     return true;
  //   }
  //   if (this.state.isLoading == nextState.isLoading) {
  //     return true;
  //   }
  //   return false;
  // }


  // componentDidUpdate(prevProps) {debugger
  //   if(prevProps.isLoading !== this.props.isLoading){
      
  //   }
  // }


  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.message ? this.props.message : 'Updating data. Please wait'}</Text>
        {
          this.props.isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : <Text style={styles.ok}>Ok</Text>
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: "85%", 
    backgroundColor: '#000', 
    padding: 8,
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    alignSelf: 'center',
    elevation: 16,
    borderRadius: 15,

  },
  text: {
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  ok: {
    color: 'green', 
    marginLeft: 20, 
    fontSize: 25, 
    fontWeight: "bold"
  }
})
