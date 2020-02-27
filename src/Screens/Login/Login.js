import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Button, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import { LoginAction, employeeDetailApi } from '../../Redux/Actions/LoginAction'; 

import AsyncStorage from '@react-native-community/async-storage';

import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';

import * as api from '../../Authentication/Api/Api';

import ToggleButton from '../../Components/Layouts/ToggleButton';

import * as RNLocalize from "react-native-localize";
 

class Login extends Component {
  constructor(props) {
    // appWithAllNavigation_V5_tsx
    super(props);

    this.state = {
      // company_id = 1
      // email: 'pratik.sangami@cloudyfox.com',
      // password: '3PvyS%&GTo',

      // email: 'regan.timsina@cloudyfox.com',
      // password: 'k5UYpfSovr',

      // email: 'biplab@gmail.com',
      // password: 'password@2',
      
      
      // company_id = 2
      // email: 'bijay@gmail.com',
      // password: 'password',

      // email: 'testuser1@yopmail.com',
      // password: 'password',

      // email: 'mobile@gmail.com',
      // password: 'password',

      email: 'mobile1@gmail.com',
      password: 'password',

      // email: 'testuser2@yopmail.com',
      // password: 'password',

      // email: 'testuser3@yopmail.com',
      // password: 'password',

      // email: 'ajay@gmail.com',
      // password: 'password',
      
      // email: 'rohit@gmail.com',
      // password: '^&ykdJ%a2C',
      
      // email: 'angel@gmail.com',
      // password: 'password',



      validationStatus: false,
      loader: false,
      touchIdHasEnrolledFinger: true,
      biometryType: null,
      switchValue: false
    };

    // console.log('getLocales ==> ', RNLocalize.getLocales());
    // console.log("getCurrencies ==> ", RNLocalize.getCurrencies());
    // console.log("getCountry ==> ", RNLocalize.getCountry());
    // console.log("getCalendar ==> ", RNLocalize.getCalendar());
    // console.log("getTemperatureUnit ==> ", RNLocalize.getTemperatureUnit());
    // console.log("getTimeZone ==> ", RNLocalize.getTimeZone());
    // console.log("uses24HourClock ==> ", RNLocalize.uses24HourClock());
  }


  static navigationOptions = {
    headerShown: false
  }


  toggleSwitch = (value) => {
    this.setState({
      switchValue: value
    })
  }


  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {

      AsyncStorage.getItem('touchIdHasenrolledFinger').then((val) => {
        JSON.parse(val) || JSON.parse(val) == null ? this.touchIdAuthorization() : this.isSupported();
      })
      
      this.setState({
        email: '',
        password: '',
        validationStatus: false,
        loader: false,
        touchIdHasEnrolledFinger: true,
        biometryType: null,
      }) 

    });
  }

  componentWillUnmount() {
    // this.focusListener.remove();
  }


  enableTouchIdAuth = () => {
    Keychain.getGenericPassword().then(credentials => {
      // console.log('key credential In enableTouchIdAuth method ==> ', credentials);
      if(credentials) {
        TouchID.isSupported().then(this.authenticate).catch(error => {
          Alert.alert('TouchID not supported', error);
        });
      } else {
        Alert.alert('Touch ID Alert', 'User need to manually login for the first time');
      }
    })
  }


  touchIdAuthorization = () => {
    AsyncStorage.getItem('touchIdHasenrolledFinger').then((val) => {

      console.log("touchIdAuthorization val ==> ", JSON.parse(val));
      if(JSON.parse(val) || JSON.parse(val) == null) {
        Keychain.getGenericPassword().then(credentials => {
          if(credentials) {
            setTimeout(() => {
              Alert.alert(
                'Touch ID Authorization',
                'Enable Touch ID For Login Into App',
                [
                  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => this.enableTouchIdAuth()},
                ],
                {cancelable: false},
              );
            }, 550);
          }
        }).catch((err) => {
          console.log('Error: in Keychain of touchIdAuthorization method ==> ', err);
        })
      }
    }).catch(() => {
      console.log('Error: Asyncstorage error in touchIdAuthorization method');
    })
  }


  authenticate = () => {
    return TouchID.authenticate().then(success => {
      this.setState({ touchIdHasenrolledFinger: false }, () => { 
        // console.log('touchid authentication ==> ', success)
        AsyncStorage.setItem('touchIdHasenrolledFinger', JSON.stringify(this.state.touchIdHasenrolledFinger)).then(() => {
          // AsyncStorage.getItem('touchIdHasenrolledFinger', (err, val) => {
          //   console.log('authenticate method Asynstorage getItem ==> ', JSON.parse(val));
          // })
        }); 
      })
      Keychain.getGenericPassword().then(credentials => {
        this.setState({ loader: true })
        const { email, password } = credentials;
        
        const obj = JSON.stringify({
          username: email,
          password: password
        });
        
    
        api.login('POST', obj).then((response) => response.json()).then((responseJson) => {
          // console.log('response ==> ', responseJson);
          if(responseJson != null || responseJson != '') {
            this.setState({ loader: false })
            this.props.navigation.navigate('Dashboard');
            // NavigationService.navigate('Dashboard');
          }
  
        }).catch(err => {
          this.setState({ loader: false })
          console.log('Error While Login From TouchID ==> ', err);
        })
  
      }).catch(err => {
        this.setState({ loader: true })
        console.log('Error: Keychain.getGenericPassword() error', err);
      });
  
    }).catch(error => {
      console.log('TouchID is canceled');
    });
  }


  isSupported = () => {
    setTimeout(() => {
      TouchID.isSupported().then(biometryType => {
        if (biometryType === 'TouchID') {
          console.log('Touch ID is supported on iOS');

        } else if (biometryType === 'FaceID') {
          console.log('Face ID is supported on iOS');

        } else if (biometryType === true) {
          this.setState({ biometryType }, () => {

            Keychain.getGenericPassword().then(credentials => {
              // console.log('key credential ==> ', credentials);
              if(credentials) {
                TouchID.isSupported().then(this.authenticate).catch(error => {
                  Alert.alert('TouchID not supported', error);
                });
              }
            })

          });
          console.log('Touch ID is supported on Android');
        }

      }).catch(error => {
        console.log('Users device does not support Touch ID (or Face ID) / This case is also triggered if users have not enabled Touch ID on their device ==> ', error);
      });

    }, 550);
  }
  

  loginHandler = () => {
    if(this.state.email != '' && this.state.password != '') {
      
      this.setState({
        validationStatus: false,
        loader: true
      })

      const obj = JSON.stringify({
        email: this.state.email,
        password: this.state.password
      });
  
      api.login('POST', obj).then((response) => response.json()).then((responseJson) => {
        const year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        month.toString().length <= 1 ? month = '0' + month : month;
        let date = new Date().getDate();
        date.toString().length <= 1 ? date = '0' + date : date;
        const fullYear = year + '/' + month + '/' + date;
        responseJson.dateAtTheTimeOfLogin = fullYear;
        responseJson.countryCode = "NP";
        responseJson.companyId = 2;

        // console.log('res Login ==> ', responseJson);
        if(responseJson.statusCode == 200 && responseJson.message == "Login Success") {

          // this.props.add(responseJson);
          this.props.dispatch(LoginAction(responseJson));

          this.employeeDetailHandler();

          Keychain.setGenericPassword(this.state.email, this.state.password);
          this.setState({
            loader: false
          })
          this.props.navigation.navigate('Main', { screen: 'Dashboard' });
        }
  
      }).catch(err => {
        this.setState({
          loader: false
        })
        console.log('Error ==> ', err);
      })
    } else {
      this.setState({
        validationStatus: true,
      })
    }
  }


  employeeDetailHandler = () => {
    this.props.dispatch(employeeDetailApi());
    // api.employeeDetail('GET').then((response) => response.json()).then((responseJson) => {
    //   if(responseJson.status == true && responseJson.statusCode == 200) {
    //     console.log('res ==> ', responseJson)
    //   }

    // }).catch((err) => {
    //   console.log('Error In Employee Detail Handler ==> ', err);
    // })
  }


  forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }


  loginUsingTouchID = () => {
    Keychain.getGenericPassword().then(credentials => {
      // console.log('key credential In LoginUsingTouchID ==> ', credentials);
      if(credentials) {
        TouchID.isSupported().then(this.authenticate).catch(error => {
          Alert.alert('TouchID not supported', error);
        });
      } else {
        Alert.alert('Touch ID Alert', 'User need to manually login for the first time');
      }
    })
  }


  render() {
    // console.log('this.props ==> ', this.props.login);
    return (
      <View style={styles.viewContainer}>

        <View style={styles.containerBody}>
          <Text style={[{ fontSize: 45 }, styles.textAlign]}>Welcome</Text>
          <Text style={styles.textAlign}>Login to your account</Text>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text>Username : </Text>
          <TextInput style={styles.textInput} placeholder="Enter Username" onChangeText={(email) => this.setState({ email })} value={this.state.email} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text>Password : </Text>
          <TextInput style={styles.textInput} placeholder="Enter Password" onChangeText={(password) => this.setState({ password })} value={this.state.password} />
        </View>

        {
          this.state.validationStatus ? <Text  style={{ marginTop: 10, textAlign: 'center', color: 'red' }}>Username / Password Incorrect</Text> : null
        }

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.buttonContainer}>
            <Button title={'Login  (BiometricStatus - ' + this.state.biometryType + ')'} onPress={this.loginHandler} />
          </View>
          <Icon style={styles.icon} name="fingerprint" size={30} color="#900" />
        </View>

        <View>
          <ToggleButton
            toggleSwitch = {this.toggleSwitch}
            switchValue = {this.state.switchValue}
            toggleText = 'Remember Me'
          />
        </View>

        <TouchableOpacity style={{ marginTop: 5  }} onPress={this.forgotPassword}>
          <Text style={{ color: 'blue', textAlign: 'center' }}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }}>
          <Text>&nbsp;</Text>
        </View>

        <View>
          { this.state.loader ? <ActivityIndicator  size="large" color="#0000ff" /> : null }
        </View>

        
        <View style={{ top: 200 }}>
          <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center' }} onPress={this.loginUsingTouchID}>
            <Text style={{ color: 'blue' }}>Log In using Touch ID </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    padding: 30
  },
  containerBody: {
    top: 100,
    marginBottom: 170,
  },
  textAlign: {
    top: 50,
    textAlign: 'center'
  },
  textInput: {
    borderBottomWidth: 1, 
    marginLeft: 20, 
    width: '40%'
  },
  buttonContainer: {
    flex: 1,
    marginTop: 50,
  },
  icon: {
    position: 'absolute', 
    elevation: 4,
    top: 52, 
    right: 10
  },
});


const mapStateToProps = state => {
  return {
    login: state.login
  }
}


// const mapDispatchToProps = dispatch => {
//   return {
//     add: (items) => {
//       dispatch(LoginAction(items))
//     }
//   }
// }


export default connect(mapStateToProps)(Login);
// export default connect(mapStateToProps, null)(Login);
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
