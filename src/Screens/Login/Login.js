import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, TouchableOpacity, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import { LoginAction, employeeDetailApi } from '../../Redux/Actions/LoginAction'; 

import AsyncStorage from '@react-native-community/async-storage';

import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';

import * as api from '../../Authentication/Api/Api';

import { NinetyNineToggleButton } from '../../Components/Layouts/Forms/NinetyNineToggleButton';
import { NinetyNineTextInput } from '../../Components/Layouts/Forms/NinetyNineTextInput';

import Toast from 'react-native-root-toast';

import * as yup from 'yup';

// import * as RNLocalize from "react-native-localize";
 

const reviewSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
})


class Login extends Component {
  // appWithAllNavigation_V5_tsx
  constructor(props) {
    super(props);

    this.state = {
      // company_id = 1
      // email: 'pratik.sangami@cloudyfox.com',
      // password: '3PvyS%&GTo',

      // email: 'regan.timsina@cloudyfox.com',
      // password: 'k5UYpfSovr',

      
      // company_id = 2
      // email: 'bijay@gmail.com',
      // password: 'password',

      email: 'biplab@gmail.com',                                    // comapy_id = 5
      password: 'password@2',

      // email: 'testuser1@yopmail.com',
      // password: 'password',

      // email: 'mobile@gmail.com',
      // password: 'password',

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

      // email: 'mobile1@gmail.com',
      // password: 'password',

      // email: 'mobile2@gmail.com',
      // password: 'password',

      // email: 'mobile3@gmail.com',
      // password: 'password',

      validationStatus: false,
      loader: false,
      touchIdHasEnrolledFinger: true,
      biometryType: null,
      switchValue: false,
      fingerprintValidation: false
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


  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {

      // AsyncStorage.getItem('touchIdHasenrolledFinger').then((val) => {
      //   JSON.parse(val) || JSON.parse(val) == null ? this.touchIdAuthorization() : this.isSupported();
      // })
      
      this.setState({
        // email: '',
        // password: '',
        validationStatus: false,
        loader: false,
        touchIdHasEnrolledFinger: true,
        biometryType: null,
        fingerprintValidation: false
      }) 

    });
  }

  componentWillUnmount() {
    this.focusListener();
  }


  toggleSwitch = (value) => {
    this.setState({
      switchValue: value
    })
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
        const { username, password } = credentials;
        
        const obj = JSON.stringify({
          email: username,
          password: password
        });
        
    
        api.login('POST', obj).then((response) => response.json()).then((responseJson) => {
          // console.log('response ==> ', responseJson);
          if(responseJson.statusCode == 200 && responseJson.status == true) {
            this.setState({ loader: false })
            this.props.navigation.navigate('Main', { screen: 'Dashboard' });
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
    // if(this.state.email != '' && this.state.password != '') {
      
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

        // console.log('res Login ==> ', responseJson);
        if(responseJson.statusCode == 200 && responseJson.status == true) {

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
    // } else {
    //   this.setState({
    //     validationStatus: true,
    //   })
    // }
  }


  employeeDetailHandler = () => {
    this.props.dispatch(employeeDetailApi());
  }


  forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }


  render() {
    // console.log('this.props ==> ', this.props.login);

    return (
      <ScrollView>
        <View style={styles.viewContainer}>

          <View style={styles.containerBody}>
            <Text style={[{ fontSize: 45 }, styles.textAlign]}>Welcome</Text>
            <Text style={styles.textAlign}>Login to your account</Text>
          </View>

          <View>
            <NinetyNineTextInput placeholder="Username" onChangeText={(email) => this.setState({ email })} value={this.state.email} />
            {/* <TextInput validationSchema={reviewSchema.email} style={styles.textInput1} placeholder="Username" onChangeText={(email) => this.setState({ email })} value={this.state.email} /> */}

            <NinetyNineTextInput placeholder="Password" hideText={true} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
            {/* <TextInput validationSchema={reviewSchema.password} secureTextEntry={true} style={styles.textInput2} placeholder="Password" onChangeText={(password) => this.setState({ password })} value={this.state.password} /> */}
          </View>

          <View>
            <NinetyNineToggleButton
              toggleSwitch = {this.toggleSwitch}
              switchValue = {this.state.switchValue}
              toggleText = 'Remember Me'
            />
          </View>

          {/* {
            this.state.validationStatus ? <Text  style={{ marginTop: 10, textAlign: 'center', color: 'red' }}>Username / Password Incorrect</Text> : null
          } */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.loginHandler} style={styles.buttonContainer}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 60, paddingVertical: 20, color: '#fff' }}>Login</Text>
            </TouchableOpacity>
            {
              this.state.fingerprintValidation ? <Icon style={styles.icon} name="fingerprint" size={30} color="#900" /> : null
            }
          </View>

          <TouchableOpacity style={{ marginTop: 5  }} onPress={this.forgotPassword}>
            <Text style={{ color: 'blue', textAlign: 'center' }}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }}>
            <Text>&nbsp;</Text>
          </View>

          <View>
            <Toast visible={this.state.loader} position={-40} shadow={true} animation={true} hideOnPress={false} >
              Updating data. Please wait
            </Toast>
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
    marginBottom: 310,
  },
  textAlign: {
    top: 50,
    textAlign: 'center'
  },
  textInput1: {
    borderWidth: 1, 
    padding: 10,
    marginBottom: 15,
    elevation: 1
  },
  textInput2: {
    borderWidth: 1, 
    padding: 10,
    marginBottom: 5,
    elevation: 1
  },
  buttonContainer: {
    backgroundColor: 'blue',
    marginTop: 30,
    marginRight: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  icon: {
    position: 'absolute', 
    color: "#fff",
    top: 48,
    right: 110
  },
});


const mapStateToProps = state => {
  return {
    login: state.login
  }
}


export default connect(mapStateToProps)(Login);
