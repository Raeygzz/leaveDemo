import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import { Calendar, CalendarList, Agenda, ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from "react-native-calendars";

import { NinetyNineHeader } from "../../Components/Shared/Headers/NinetyNineHeader";
import NinetyNineLoader from '../../Components/Shared/Loaders/NinetyNineLoader';

import { connect } from 'react-redux';
import { netInfo, eventsApi } from '../../Redux/Actions/eventsAction';

import { _Events_ListItem } from '../../Components/Layouts/_Events_ListItem';

import { NetworkContext } from '../../Helper/NetworkProvider/NetworkProvider';


class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {}
    };
  }
  static contextType = NetworkContext;


  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.setState({
        items: {}
      });
      this.events();
    });
  }

  componentWillUnmount = () => {
    this.focusListener();
  }


  events = () => {
    if(this.context.isConnected) {
      this.props.dispatch(eventsApi());

    } else {
      obj = {
        activityIndicatorOrOkay: false,
        loaderStatus: true,
        loaderMessage: 'No Internet Connection'
      }

      this.props.dispatch(netInfo(obj));
    }
  }


  onDateChanged = () => {
    console.log("on date changed");
  };

  onMonthChange = () => {
    console.log("on month changed");
  };


  render() {
    console.log('this.props ==> ', this.props.events.events);

    return (
      <View style={{ flex: 1 }}>
        <NinetyNineHeader title="Events/Announcement" isHome={true} navigation={this.props.navigation} />

        <View style={styles.bodyContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Upcoming Events</Text>

          <View
            style={{ width: "100%", marginVertical: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
            <View style={styles.highlightedEvents}>
              <Icon size={20} name="rocket" color="yellow" />
              <Text>Development</Text>
              <Text style={{ fontSize: 11 }}>10th Feb</Text>
            </View>

            <View style={styles.highlightedEvents}>
              <Icon size={20} name="fire" color="red" />
              <Text>Design</Text>
              <Text style={{ fontSize: 11 }}>12th Feb</Text>
            </View>

            <View style={styles.highlightedEvents}>
              <Icon size={20} name="ruler-combined" color="green" />
              <Text>Algorithm</Text>
              <Text style={{ fontSize: 11 }}>1st March</Text>
            </View>
          </View>

          <View
            style={{ marginBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
            <Text style={{ fontSize: 22 }}>March, 2020</Text>
            <Icon size={20} name="calendar-alt" />
          </View>

          <CalendarProvider
            date={"2020-03-10"}
            onDateChanged={this.onDateChanged}
            onMonthChange={this.onMonthChange}
            disabledOpacity={0.6}
          >
            <ExpandableCalendar
              // horizontal={false}
              // hideArrows
              // disablePan
              // hideKnob
              // initialPosition={ExpandableCalendar.positions.OPEN}
              // calendarStyle={styles.calendar}
              // headerStyle={styles.calendar} // for horizontal only
              // disableWeekScroll
              // theme={this.getTheme()}
              firstDay={1}
              // leftArrowImageSource={require('../img/previous.png')}
              // rightArrowImageSource={require('../img/next.png')}
            />
          </CalendarProvider>


          <FlatList
            data={this.props.events.events}
            renderItem={({ item }) => (
              <_Events_ListItem listItem={item} />
            )}
            keyExtractor={item => item.id}
          />

          <NinetyNineLoader />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    padding: 20,
    flex: 1
  },
  highlightedEvents: {
    borderWidth: 1,
    padding: 10,
    width: "31%"
  },
});


const mapStateToProps = state => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(Events);
