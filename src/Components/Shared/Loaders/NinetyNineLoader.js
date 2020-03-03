import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Modal } from "react-native";

import { connect } from 'react-redux';


class NinetyNineLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false
    };

    this.propsValue = null;
  }
  

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isShow !== nextProps.someValue) {
      return {
        derivedData: computeDerivedState(nextProps),
        someMirroredValue: nextProps.someValue
      };
    }

    // Return null to indicate no change to state.
    return null;
  }
          
          
  componentDidUpdate(prevProps) {debugger
    if(this.props.storeState.login.loaderStatus) {
      this.propsValue = this.props.storeState.login.loaderStatus

    } else if(this.props.storeState.checkInOut.loaderStatus) {
      this.propsValue = this.props.storeState.checkInOut.loaderStatus
    }

    if (this.propsValue !== prevProps.storeState.login.loaderStatus) {
      this.setState({
        isShow: this.propsValue
      }, () => {
        console.log('isShowForLogin ==> ', this.state);
      });
    }

    // if(this.props.storeState.login.loaderStatus !== false) {
    //   if (this.props.storeState.login.loaderStatus !== prevProps.storeState.login.loaderStatus) {
    //     this.setState({
    //       isShow: this.props.storeState.login.loaderStatus
    //     }, () => {
    //       console.log('isShowForLogin ==> ', this.state);
    //     });
    //   }

    // } else if(this.props.storeState.checkInOut.loaderStatus !== false) {
    //   if (this.props.storeState.checkInOut.loaderStatus !== prevProps.storeState.checkInOut.loaderStatus) {
    //     this.setState({
    //       isShow: this.props.storeState.checkInOut.loaderStatus 
    //     }, () => {
    //       console.log('isShowForCheckInOut ==> ', this.state);
    //     });
    //   }
    // }
  }


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
            {this.props.message ? this.props.message : "Updating data. Please wait"}
          </Text>

          { this.props.isLoading ? ( <ActivityIndicator size="large" color="#00ff00" /> ) : ( <Text style={styles.ok}>Ok</Text> ) }
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
// export default NinetyNineLoader;
