import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { Day, Month } from '../../Helper/Constants/Constant';
import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';

import { connect } from 'react-redux';



class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todayDate: null,
      elapsedTime: null
    }
  }

  static navigationOptions = {
    headerShown: false
  };


  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {

      const year = new Date().getFullYear();
      const monthNum = new Date().getMonth();
      const month = Month[monthNum];
      const date = new Date().getDate();
      const dayNum = new Date().getDay();
      const day = Day[dayNum];
      const todayDate = day + ', ' + date + ' ' + month + ' ' + year;

      this.setState({
        todayDate: todayDate
      });

      if(this.props.storeState.checkInOut.checkInAlready) {
        this.elapsedTime = setInterval(() => {
          this.showElapsedTime();
        }, 1000);
      }
    });
  }

  componentWillUnmount = () => {
    this.focusListener();
    clearInterval(this.elapsedTime);
  }


  showElapsedTime = () => {
    let dateNTime = new Date(this.props.storeState.checkInOut.checkInDate + ' ' + this.props.storeState.checkInOut.checkInTime);
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

  
  render() {
    // console.log('(DASHBOARD)this.props.storeState ==> ', this.props.storeState);

    return(
      <View>
        <NinetyNineHeader isHome={true} navigation={this.props.navigation}  />

        <View style={styles.bodyContainer}>
          {
            this.props.storeState.checkInOut.checkInAlready ? <View style={{ backgroundColor: "blue", padding: 10, borderRadius: 40, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <View>
                <Text style={styles.textColor}>Check in</Text>
                <Text style={styles.textColor}>{this.props.storeState.checkInOut.checkInTime != "" ? this.props.storeState.checkInOut.checkInTime : 'n/a'}</Text>
              </View>

              <View>
                <Text style={styles.textColor}>Time Elapsed</Text>
                <Text style={styles.textColor}>{this.state.elapsedTime}</Text>
              </View>
            </View> : null
          }

          <Text style={{ marginBottom: 20 }}>{this.state.todayDate}</Text>

          <Text style={{ fontSize: 22, textAlign: 'left', fontWeight: "bold", }}>{'Hello ' + this.props.storeState.login.fullName}</Text>
          <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: 'left' }}>Welcome Home!</Text>

          <Text style={{ marginTop: 40, marginBottom: 10, textAlign: 'left', fontSize: 25 }}>Boards</Text>

          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20, borderWidth: 1, paddingVertical: 10 }} onPress={() => this.props.navigation.navigate('Home', { screen: 'CheckInOut' })}>
            <View>
              <Text style={{ fontSize: 22 }}>Check In - Check Out</Text>
              <Text>Quick check in and check out</Text>
            </View>
            <Icon name="check" size={30} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20, borderWidth: 1, paddingVertical: 10 }} onPress={() => this.props.navigation.navigate('Home', { screen: 'ApplyLeave' })}>
            <View>
              <Text style={{ fontSize: 22 }}>Apply For Leave</Text>
              <Text>Just one click and you are done</Text>
            </View>
            <Icon name="calendar-check" size={30} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20, borderWidth: 1, paddingVertical: 10 }} onPress={() => this.props.navigation.navigate('Home', { screen: 'Home' })}>
            <View>
              <Text style={{ fontSize: 22 }}>Events / News</Text>
              <Text>Check events and announcements</Text>
            </View>
            <Icon name="volume-up" size={30} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20, borderWidth: 1, paddingVertical: 10 }} onPress={() => this.props.navigation.navigate('Main', { screen: 'Reports' })}>
            <View>
              <Text style={{ fontSize: 22 }}>History and Reports</Text>
              <Text>Check leave history, attendance and more</Text>
            </View>
            <Icon name="chart-bar" size={30} color="#000" />
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  bodyContainer: {
    padding: 30,
  },
  textColor: {
    color: '#fff',
  }
})

const mapStateToProps = state => {
  return {
    storeState: state
  }
}

export default connect(mapStateToProps)(Dashboard);
