import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList } from 'react-native';

import { Day, Month } from '../../Helper/Constants/Constant';
import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';
import { NinetyNineButton } from '../../Components/Shared/Buttons/NinetyNineButton';
import { NinetyNineOutlineButton } from '../../Components/Shared/Buttons/NinetyNineOutlineButton';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { connect } from 'react-redux';
import { checkInOutStatusApi, viewWeeklyReportApi, checkInApi, checkOutApi } from '../../Redux/Actions/CheckInOutAction';

import ListItem from '../../Components/Layouts/ListItem';


class CheckInOut extends Component {
  constructor(props) {
    super(props);

    const todayDateYear = new Date().getFullYear();
    const todayDateMonthNum = new Date().getMonth();
    const todayDateMonth = Month[todayDateMonthNum];
    const todayDateDate = new Date().getDate();
    const todayDateDayNum = new Date().getDay();
    const todayDateDay = Day[todayDateDayNum];
    const todayDate = todayDateDay + ', ' + todayDateDate + ' ' + todayDateMonth + ' ' + todayDateYear;

    this.state = {
      myLat: '',
      myLon: '',
      checkInLocation: '',
      fullYear: '',
      myApiKey: 'AIzaSyAlLxofrXNceXHrdMbUQgwz6F1YF9WlKyE',
      todayDate: todayDate,
      currentTime: null,
      elapsedTime: null,
    }
  }

  static navigationOptions = {
    headerShown: false
  };


  UNSAFE_componentWillMount() {
    this.checkInOutStatus();
    this.viewReport();
    this.getCurrentTime();
  }


  getCurrentTime = () => {
    let hour = new Date().getHours();
    if (hour < 10) { hour = '0' + hour; }
    let minutes = new Date().getMinutes();
    if (minutes < 10) { minutes = '0' + minutes; }
    let seconds = new Date().getSeconds();
    if (seconds < 10) { seconds = '0' + seconds; }

    // let am_pm = 'pm';
    // if (hour > 12) {
    //   hour = hour - 12;
    // }

    // if (hour == 0) {
    //   hour = 12;
    // }

    // if (new Date().getHours() < 12) {
    //   am_pm = 'am';
    // }

    this.setState({ currentTime: hour + ':' + minutes + ':' + seconds });
  }


  showElapsedTime = () => {
    let dateNTime = new Date(this.props.check.checkInOut.checkInDate + ' ' + this.props.check.checkInOut.checkInTime);
    let startStamp = dateNTime.getTime();

    let newStamp = new Date().getTime();

    let diff = Math.round((newStamp - startStamp)/1000);

    let h = Math.floor(diff/(60*60));
    if(h < 10) { h = '0' + h; }
    diff = diff-(h*60*60);
    let m = Math.floor(diff/(60));
    if(m < 10) { m = '0' + m; }
    diff = diff-(m*60);
    let s = diff;
    if(s < 10) { s = '0' + s; }

    this.setState({ elapsedTime: h + ':' + m + ':' + s });
  }


  componentDidMount = () => {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);

    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {

      const year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      month.toString().length <= 1 ? month = '0' + month : month;
      let date = new Date().getDate();
      date.toString().length <= 1 ? date = '0' + date : date;
      const fullYear = year + '/' + month + '/' + date;


      const todayDateYear = new Date().getFullYear();
      const todayDateMonthNum = new Date().getMonth();
      const todayDateMonth = Month[todayDateMonthNum];
      const todayDateDate = new Date().getDate();
      const todayDateDayNum = new Date().getDay();
      const todayDateDay = Month[todayDateDayNum];
      const todayDate = todayDateDay + ', ' + todayDateDate + ' ' + todayDateMonth + ' ' + todayDateYear;

      this.setState({
        myLat: '',
        myLon: '',
        checkInLocation: '',
        fullYear: fullYear,
        myApiKey: 'AIzaSyAlLxofrXNceXHrdMbUQgwz6F1YF9WlKyE',
        todayDate: todayDate
      }, () => {
        // console.log('state ==>', this.state);
      });
      // this.checkInOutStatus();
      // this.viewReport();
    });
  }

  componentWillUnmount = () => {
    this.focusListener();
    clearInterval(this.timer, this.elapsedTime);
    // clearInterval(this.elapsedTime);
  }


  checkInOutStatus = () => {
    this.props.dispatch(checkInOutStatusApi());

    this.elapsedTime = setInterval(() => {
      if(this.props.check.checkInOut.checkInStatus && !this.props.check.checkInOut.checkOutStatus) {
        this.showElapsedTime();
      }
    }, 1000);
  }


  viewReport = () => {
    this.props.dispatch(viewWeeklyReportApi());
  }

  
  // requestLocationPermission = async() => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       // {
  //       //   title: 'Geo Location Access Permission',
  //       //   message:
  //       //     'Ninety nine leave needs access to your location ' +
  //       //     'so you can checkin for today.',
  //       //   // buttonNeutral: 'Ask Me Later',
  //       //   // buttonNegative: 'Cancel',
  //       //   // buttonPositive: 'OK',
  //       // },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the location');
  //     } else {
  //       console.log('location permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }


  findGeoLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // {
        //   title: 'Geo Location Access Permission',
        //   message:
        //     'Ninety nine leave needs access to your location ' +
        //     'so you can checkin for today.',
        //   // buttonNeutral: 'Ask Me Later',
        //   // buttonNegative: 'Cancel',
        //   // buttonPositive: 'OK',
        // },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');

        Geolocation.getCurrentPosition((position) => {
          const location = position;

          let body = JSON.stringify({
            user_id: this.props.check.login.userId,
            date: this.state.fullYear,
            country: "NP",
            company_id: this.props.check.login.companyId,
            checkin_location: JSON.stringify({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            })
          })
          // console.log('body ==> ', body);
    
          this.props.dispatch(checkInApi(body));

          this.elapsedTime = setInterval(() => {
            this.showElapsedTime();
          }, 1000);

          setTimeout(() => {
            // this.props.check.checkInOut.viewReportResponseStatus ? this.viewReport(): null;
            this.props.check.checkInOut.viewReportResponseStatusFromCheckInOut ? this.viewReport(): null;
          }, 1000)

          // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.myLat + ',' + this.state.myLon + '&key=' + this.state.myApiKey)
          //   .then((response) => response.json())
          //   .then((responseJson) => {
          //   console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
          // })

        },
        (error) => Alert.alert('Permission Denied', 'Ninety leave app ' + error.message + ' for checkin.'),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }


  checkOutHandler = () => {
    Geolocation.getCurrentPosition((position) => {
      const location = position;

      let body = JSON.stringify({
        user_id: this.props.check.login.userId,
        date: this.state.fullYear,
        country: "NP",
        checkin_location: JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      })

      this.props.dispatch(checkOutApi(body));

      clearInterval(this.elapsedTime);

      setTimeout(() => {
        this.props.check.checkInOut.viewReportResponseStatusFromCheckInOut ? this.viewReport(): null;
      }, 1000)
    },
    (error) => Alert.alert('Permission Denied', 'Ninety leave app ' + error.message + ' for checkout.'),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  
  render() {
    // console.log('this.props.check.checkInOut ==> ', this.props.check.checkInOut);
    // console.log('this.state ==> ', this.state);

    return(
      <View style={{ flex: 1 }}>
        <NinetyNineHeader title="Attendance" isHome={true} navigation={this.props.navigation}  />

        <View style={styles.bodyContainer}>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 5 }}>
            <Icon name="clock" size={30} />
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 20 }}>{this.state.currentTime}</Text>
          </View>
          <Text style={{ marginTop: 8, marginLeft: 5 }}>{this.state.todayDate}</Text>

          <View style={{ height: 30 }}>
            <Text>&nbsp;</Text>
          </View>

          <View style={{ borderWidth: 1 }}>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <View>
                <Text>Check in</Text>
                <Text>{this.props.check.checkInOut.checkInTime == "" ? 'n/a' : this.props.check.checkInOut.checkInTime}</Text>
              </View>


              <View>
                <Text>Time Elapsed</Text>
                {/* <Text>{ this.state.elapsedTime == 'NaN:NaN:NaN' ? 'n/a' : this.state.elapsedTime }</Text> */}
                <Text>
                  { this.state.elapsedTime == null || this.state.elapsedTime == "NaN:NaN:NaN" ? 
                    this.props.check.checkInOut.elapsedTime != "" ? this.props.check.checkInOut.elapsedTime : 'n/a' 
                    : this.state.elapsedTime 
                  }
                </Text>
              </View>
            </View>

            <View style={{ height: 16 }}>
              <Text>&nbsp;</Text>
            </View>

            <View style={{ marginLeft: 40, flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Text>Location:</Text>
              <Text style={{ marginLeft: 10 }}>{this.props.check.checkInLocation ? this.props.check.checkInLocation : 'n/a'}</Text>
            </View>

            <View style={{ height: 15 }}>
              <Text>&nbsp;</Text>
            </View>

            {/* <View style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              { this.props.check.checkInOut.checkInStatus && this.props.check.checkInOut.checkOutStatus ? <Button title="Check In" disabled={true} onPress={this.findGeoLocation} /> : this.props.check.checkInOut.checkInStatus ? <Button title="Check Out" onPress={this.checkOutHandler} /> : <Button title="Check In" onPress={this.findGeoLocation} /> }
              <Button color="lightgrey" title="View Report" onPress={() => this.props.navigation.navigate('Main', { screen: 'Reports' })} />
            </View> */}

            <View style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              { 
                this.props.check.checkInOut.checkInStatus && this.props.check.checkInOut.checkOutStatus ? 
                <NinetyNineButton style={styles.ninetyNineButton} buttonTitle="Check In" disabled={true} onPress={this.findGeoLocation} />  : 
                this.props.check.checkInOut.checkInStatus ? <NinetyNineButton style={styles.ninetyNineButton} buttonTitle="Check Out" onPress={this.checkOutHandler} />  : <NinetyNineButton style={styles.ninetyNineButton} buttonTitle="Check In" onPress={this.findGeoLocation} /> 
              }

              <NinetyNineOutlineButton style={styles.ninetyNineOutlineButton} outlineButtonTitle="View Report" onItemPressed={() => this.props.navigation.navigate('Main', { screen: 'Reports' })} />
            </View>
          </View>
          

          <View style={{ height: 30 }}>
            <Text>&nbsp;</Text>
          </View>

          <View>
            <FlatList
              data={this.props.check.checkInOut.checkInOutReports}
              renderItem={({ item }) => (
                <ListItem title={item} />
              )}
              keyExtractor={item => item.id}
            />
          </View>


        </View>
      </View>
    )
  }
}


const mapStateToProps = state => {
  return {
    check: state
  }
}


export default connect(mapStateToProps)(CheckInOut);


const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  ninetyNineButton: {
    fontSize: 18, 
    fontWeight: 'bold', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    color: '#fff'
  },
  ninetyNineOutlineButton: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    color: '#000' 
  }
})
