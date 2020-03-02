import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Modal } from "react-native";

import { connect } from 'react-redux';


class NinetyNineLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: null
    };
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.loader !== prevProps.loader) {
  //     this.setState({
  //       isShow: this.props.loader
  //     }, () => {
  //       console.log('isShow ==> ', this.state);
  //     });
  //   }
  // }


  componentDidUpdate(prevProps) {
    if (this.props.login.loaderStatus !== prevProps.login.loaderStatus) {
      this.setState({
        isShow: this.props.login.loaderStatus
      }, () => {
        // console.log('isShow ==> ', this.state);
      });
    }
  }


  render() {
    // console.log('this.props.login ==> ', this.props.login);

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
    login: state.login
  }
}

export default connect(mapStateToProps)(NinetyNineLoader);
// export default NinetyNineLoader;
