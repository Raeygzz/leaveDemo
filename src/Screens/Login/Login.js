import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { netInfo, loginApi } from "../../Redux/Actions/LoginAction";

import AsyncStorage from "@react-native-community/async-storage";

import TouchID from "react-native-touch-id";
import * as Keychain from "react-native-keychain";

import _Login_Form from "../../Components/Layouts/_Login_Form";

import * as api from "../../Authentication/Api/Api";

import NinetyNineLoader from "../../Components/Shared/Loaders/NinetyNineLoader";

// import * as RNLocalize from "react-native-localize";

import { NetworkContext } from '../../Helper/NetworkProvider/NetworkProvider';


class Login extends Component {
  // appWithAllNavigation_V5_tsx
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      biometryType: null
    };

    // console.log('getLocales ==> ', RNLocalize.getLocales());
    // console.log("getCurrencies ==> ", RNLocalize.getCurrencies());
    // console.log("getCountry ==> ", RNLocalize.getCountry());
    // console.log("getCalendar ==> ", RNLocalize.getCalendar());
    // console.log("getTemperatureUnit ==> ", RNLocalize.getTemperatureUnit());
    // console.log("getTimeZone ==> ", RNLocalize.getTimeZone());
    // console.log("uses24HourClock ==> ", RNLocalize.uses24HourClock());
  }
  static contextType = NetworkContext;

  static navigationOptions = {
    headerShown: false
  };


  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      // AsyncStorage.getItem('touchIdHasenrolledFinger').then((val) => {
      //   JSON.parse(val) || JSON.parse(val) == null ? this.touchIdAuthorization() : this.isSupported();
      // })

      this.setState({
        loader: false,
        biometryType: null
      });
    });
  }

  componentWillUnmount() {
    this.focusListener();
  }

  enableTouchIdAuth = () => {
    Keychain.getGenericPassword().then(credentials => {
      // console.log('key credential In enableTouchIdAuth method ==> ', credentials);
      if (credentials) {
        TouchID.isSupported()
          .then(this.authenticate)
          .catch(error => {
            Alert.alert("TouchID not supported", error);
          });
      } else {
        Alert.alert(
          "Touch ID Alert",
          "User need to manually login for the first time"
        );
      }
    });
  };

  touchIdAuthorization = () => {
    AsyncStorage.getItem("touchIdHasenrolledFinger")
      .then(val => {
        console.log("touchIdAuthorization val ==> ", JSON.parse(val));
        if (JSON.parse(val) || JSON.parse(val) == null) {
          Keychain.getGenericPassword()
            .then(credentials => {
              if (credentials) {
                setTimeout(() => {
                  Alert.alert(
                    "Touch ID Authorization",
                    "Enable Touch ID For Login Into App",
                    [
                      {
                        text: "Ask me later",
                        onPress: () => console.log("Ask me later pressed")
                      },
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => this.enableTouchIdAuth() }
                    ],
                    { cancelable: false }
                  );
                }, 550);
              }
            })
            .catch(err => {
              console.log(
                "Error: in Keychain of touchIdAuthorization method ==> ",
                err
              );
            });
        }
      })
      .catch(() => {
        console.log("Error: Asyncstorage error in touchIdAuthorization method");
      });
  };

  authenticate = () => {
    return TouchID.authenticate()
      .then(success => {
        this.setState({ touchIdHasenrolledFinger: false }, () => {
          // console.log('touchid authentication ==> ', success)
          AsyncStorage.setItem("touchIdHasenrolledFinger", JSON.stringify(this.state.touchIdHasenrolledFinger)).then(() => {
            // AsyncStorage.getItem('touchIdHasenrolledFinger', (err, val) => {
            //   console.log('authenticate method Asynstorage getItem ==> ', JSON.parse(val));
            // })
          });
        });
        Keychain.getGenericPassword()
          .then(credentials => {
            this.setState({ loader: true });
            const { username, password } = credentials;

            const obj = JSON.stringify({
              email: username,
              password: password
            });

            api
              .login("POST", obj)
              .then(response => response.json())
              .then(responseJson => {
                // console.log('response ==> ', responseJson);
                if (
                  responseJson.statusCode == 200 &&
                  responseJson.status == true
                ) {
                  this.setState({ loader: false });
                  this.props.navigation.navigate("Main", {
                    screen: "Dashboard"
                  });
                }
              })
              .catch(err => {
                this.setState({ loader: false });
                console.log("Error While Login From TouchID ==> ", err);
              });
          })
          .catch(err => {
            this.setState({ loader: true });
            console.log("Error: Keychain.getGenericPassword() error", err);
          });
      })
      .catch(error => {
        console.log("TouchID is canceled");
      });
  };

  isSupported = () => {
    setTimeout(() => {
      TouchID.isSupported()
        .then(biometryType => {
          if (biometryType === "TouchID") {
            console.log("Touch ID is supported on iOS");
          } else if (biometryType === "FaceID") {
            console.log("Face ID is supported on iOS");
          } else if (biometryType === true) {
            this.setState({ biometryType }, () => {
              Keychain.getGenericPassword().then(credentials => {
                // console.log('key credential ==> ', credentials);
                if (credentials) {
                  TouchID.isSupported()
                    .then(this.authenticate)
                    .catch(error => {
                      Alert.alert("TouchID not supported", error);
                    });
                }
              });
            });
            console.log("Touch ID is supported on Android");
          }
        })
        .catch(error => {
          console.log(
            "Users device does not support Touch ID (or Face ID) / This case is also triggered if users have not enabled Touch ID on their device ==> ",
            error
          );
        });
    }, 550);
  };

  loginHandler =  (values) => {
    if(this.context.isConnected) {
      const obj = JSON.stringify({
        email: values.email,
        password: values.password
      });
  
      this.props.dispatch(loginApi(obj));

    } else {
      obj = {
        activityIndicatorOrOkay: false,
        loaderStatus: true,
        loaderMessage: 'No Internet Connection'
      }
      
      this.props.dispatch(netInfo(obj));
    }
  };


  forgotPassword = () => {
    this.props.navigation.navigate("ForgotPassword");
  };


  render() {
    // console.log('this.props ==> ', this.props.login);

    return (
      <ScrollView>
        <View style={styles.viewContainer}>
          <View style={styles.containerBody}>
            <Text style={[{ fontSize: 45 }, styles.textAlign]}>Welcome</Text>
            <Text style={styles.textAlign}>Login to your account</Text>
          </View>

          <_Login_Form onPress={this.loginHandler} />

          <TouchableOpacity style={{ marginTop: 5 }} onPress={this.forgotPassword}>
            <Text style={{ color: 'blue', textAlign: 'center' }}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }}>
            <Text>&nbsp;</Text>
          </View>

          <View>
            <NinetyNineLoader />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    padding: 30
  },
  containerBody: {
    top: 230,
    marginBottom: 310
  },
  textAlign: {
    top: 50,
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

export default connect(mapStateToProps)(Login);
