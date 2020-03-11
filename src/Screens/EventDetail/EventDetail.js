import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import Icon from "react-native-vector-icons/FontAwesome5";

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';

import { connect } from 'react-redux';
import { netInfo, eventDetailApi } from '../../Redux/Actions/eventsAction';

import { Day, Month } from '../../Helper/Constants/Constant';

import { NetworkContext } from '../../Helper/NetworkProvider/NetworkProvider';

import { WebView } from 'react-native-webview';


class EventDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.route.params.eventId
    }
  }
  static contextType = NetworkContext;


  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.setState({
        eventId: this.props.route.params.eventId
      });
      this.eventDetail();
    });
  }

  componentWillUnmount = () => {
    this.focusListener();
  }


  eventDetail = () => {
    if(this.context.isConnected) {
      this.props.dispatch(eventDetailApi(this.state.eventId));

    } else {
      obj = {
        activityIndicatorOrOkay: false,
        loaderStatus: true,
        loaderMessage: 'No Internet Connection'
      }

      this.props.dispatch(netInfo(obj));
    }
  }


  render() {
    // console.log('this.props.eventDetail ==> ', this.props.eventDetail);

    const date = new Date(this.props.eventDetail.startDate);
    const dayNum = date.getDay();
    const monthNum = date.getMonth();
    const day = Day[dayNum];
    const month = Month[monthNum];

    return(
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ elevation: 1 }}>
            <NinetyNineHeader isHome={false} navigation={this.props.navigation} color="#fff" size={40} />
          </View>

          <Image style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: 350}} source={{ uri: this.props.eventDetail.image }} />

          <View style={styles.detailBodyContainer}>
            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'  }}>
              <Text style={{ paddingVertical: 0.5, paddingHorizontal: 8, backgroundColor: 'orange' }}></Text>
              <Text style={{ marginLeft: 30, fontSize: 22, fontWeight: 'bold' }}>{this.props.eventDetail.title + ' = ' + this.props.eventDetail.type}</Text>
            </View>

            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'  }}>
              <Icon name="clock" size={20} />
              <Text style={{ marginLeft: 30 }}>{this.props.eventDetail.startDate + '  ~  ' + this.props.eventDetail.endDate}</Text>
            </View>

            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'  }}>
              <Icon name="calendar-alt" size={20} />
              <Text style={{ marginLeft: 30 }}>{day + ',  ' + this.props.eventDetail.startDate.slice(8, 10) + '  ' + month + '  ' + this.props.eventDetail.startDate.slice(0, 4)}</Text>
            </View>

            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'  }}>
              <Icon name="map-marker-alt" size={20} />
              <Text style={{ marginLeft: 30 }}>No location available</Text>
            </View>

            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'  }}>
              <Icon style={{ position: 'absolute', top: 0, left: 0, right: 0 }} name="align-left" size={20} />
              {/* <WebView
                originWhitelist={['*']}
                source={{ html: '<h1>Hello world</h1>' }}
              /> */}
              <Text style={{ marginLeft: 50, textAlign: 'left' }}>{this.props.eventDetail.title && this.props.eventDetail.detail ? (this.props.eventDetail.title + ',  ' + this.props.eventDetail.detail.substr(30)) : (null)}</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  detailBodyContainer: {
    flex: 1,
    marginTop: 210,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingLeft: 22,
  }
})


const mapStateToProps = state => {
  return {
    eventDetail: state.events.events[0]
  }
}


export default connect(mapStateToProps)(EventDetail);
