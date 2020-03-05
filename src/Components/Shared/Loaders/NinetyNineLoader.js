import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Modal, TouchableOpacity } from "react-native";

import { netInfo } from '../../../Redux/Actions/LoginAction';
import { connect } from 'react-redux';

class NinetyNineLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: null,
    };
  }
  

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isShow !== nextProps.storeState.login.loaderStatus || nextProps.storeState.checkInOut.loaderStatus) {
      return {
        isShow: nextProps.storeState.login.loaderStatus || nextProps.storeState.checkInOut.loaderStatus
      };
    }

    // Return null to indicate no change to state.
    return null;
  }


  okHandler = () => {
    obj = {
      activityIndicatorOrOkay: null,
      loaderStatus: null,
      loaderMessage: ''
    }

    this.props.dispatch(netInfo(obj));
  }


  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.isShow !== nextProps.storeState.login.loaderStatus || nextProps.storeState.checkInOut.loaderStatus) {
  //     return true;
  //   }
  //   if (this.state.isShow !== nextState.isShow) {
  //     return true;
  //   }
  //   return false;
  // }


  // componentDidUpdate() {    
  //   if (this.shouldComponentUpdate) {
  //     this.setState({
  //       isShow: this.props.storeState.login.loaderStatus || this.props.storeState.checkInOut.loaderStatus
  //     }, () => {
  //       // console.log('isShow ==> ', this.state);
  //     });
  //   }
  // }
          
          
  // componentDidUpdate(prevProps) {    
  //   if (this.props.storeState.login.loaderStatus !== prevProps.storeState.login.loaderStatus) {
  //     this.setState({
  //       isShow: this.props.storeState.login.loaderStatus
  //     }, () => {
  //       console.log('isShow ==> ', this.state);
  //     });
  //   }
  // }


  render() {
    // console.log('this.props ==> ', this.props);

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isShow}
        // style={{ }}
        // onRequestClose={() => {
        // Alert.alert('Important task happening, cannot exit.');
        // this.setState({isShow: false})
        // this.props.navigation.goBack()
        // this.visible={false}
        // }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>
            {
              this.props.storeState.login.loaderMessage != '' ? this.props.storeState.login.loaderMessage : 
              this.props.storeState.checkInOut.loaderMessage != '' ? this.props.storeState.checkInOut.loaderMessage : 
              null
            }
          </Text>

          { 
            this.props.storeState.login.activityIndicatorOrOkay || this.props.storeState.checkInOut.activityIndicatorOrOkay ? ( <ActivityIndicator size="large" color="#00ff00" /> ) : 
            ( <TouchableOpacity onPress={this.okHandler}><Text style={styles.ok}>Ok</Text></TouchableOpacity> ) 
          }
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    width: "85%",
    backgroundColor: "#000",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    elevation: 16,
    borderRadius: 15
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  ok: {
    color: "green",
    marginLeft: 20,
    fontSize: 25,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    storeState: state,
  }
}

export default connect(mapStateToProps)(NinetyNineLoader);
