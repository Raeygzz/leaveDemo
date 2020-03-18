import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { MonthShortcut } from '../../Helper/Constants/Constant';
import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';
import NinetyNineLoader from '../../Components/Shared/Loaders/NinetyNineLoader';

import { VictoryLine, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

import { connect } from 'react-redux';
import { netInfo, leaveTypeApi, viewTimelyAttendanceReportApi } from '../../Redux/Actions/ReportsAction';

import { NetworkContext } from '../../Helper/NetworkProvider/NetworkProvider';


const data = [
  { quarter: 0, earnings: 0 },
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
  { quarter: 5, earnings: null },
];


class Reports extends Component {
  constructor(props) {
    super(props);

    // today date
    const year = new Date().getFullYear();
    const monthNum = new Date().getMonth();
    const month = MonthShortcut[monthNum];
    const date = new Date().getDate();
    const todayDate = month + ' ' + date + ', ' + year;


    // last 7 days date
    const convertedForLast7Days_Date = new Date(new Date().getTime() - (7*24*60*60*1000));
    const last7Days_Date_Year = new Date(convertedForLast7Days_Date).getFullYear();
    const last7Days_monthNum = new Date(convertedForLast7Days_Date).getMonth();
    const last7Days_Date_Month = MonthShortcut[last7Days_monthNum];
    let last7Days_Date = new Date(convertedForLast7Days_Date).getDate();
    last7Days_Date.toString().length <= 1 ? last7Days_Date = '0' + last7Days_Date : last7Days_Date;
    const attendaceReport_FOR_7Days_Api_Data = last7Days_Date_Year + '/' + Number(last7Days_monthNum+1) + '/' + last7Days_Date;
    const attendaceReport_FOR_7Days = last7Days_Date_Month + ' ' + last7Days_Date + ', ' + last7Days_Date_Year;
    // console.log('attendaceReport_FOR_7Days ==> ', attendaceReport_FOR_7Days);


    // last 15 days date
    const convertedForLast15Days_Date = new Date(new Date().getTime() - (15*24*60*60*1000));
    const last15Days_Date_Year = new Date(convertedForLast15Days_Date).getFullYear();
    const last15Days_monthNum = new Date(convertedForLast15Days_Date).getMonth();
    const last15Days_Date_Month = MonthShortcut[last15Days_monthNum];
    let last15Days_Date = new Date(convertedForLast15Days_Date).getDate();
    last15Days_Date.toString().length <= 1 ? last15Days_Date = '0' + last15Days_Date : last15Days_Date;
    const attendaceReport_FOR_15Days_Api_Data = last15Days_Date_Year + '/' + Number(last15Days_monthNum+1) + '/' + last15Days_Date;
    const attendaceReport_FOR_15Days = last15Days_Date_Month + ' ' + last15Days_Date + ', ' + last15Days_Date_Year;
    // console.log('attendaceReport_FOR_15Days ==> ', attendaceReport_FOR_15Days);


    // last 30 days date
    const convertedForLast30Days_Date = new Date(new Date().getTime() - (30*24*60*60*1000));
    const last30Days_Date_Year = new Date(convertedForLast30Days_Date).getFullYear();
    const last30Days_monthNum = new Date(convertedForLast30Days_Date).getMonth();
    const last30Days_Date_Month = MonthShortcut[last30Days_monthNum];
    let last30Days_Date = new Date(convertedForLast30Days_Date).getDate();
    last30Days_Date.toString().length <= 1 ? last30Days_Date = '0' + last30Days_Date : last30Days_Date;
    const attendaceReport_FOR_30Days_Api_Data = last30Days_Date_Year + '/' + Number(last30Days_monthNum+1) + '/' + last30Days_Date;
    const attendaceReport_FOR_30Days = last30Days_Date_Month + ' ' + last30Days_Date + ', ' + last30Days_Date_Year;
    // console.log('attendaceReport_FOR_30Days ==> ', attendaceReport_FOR_30Days);

    
    this.state = {
      todayDate: todayDate,
      thisWeekButtonDesign: true, 
      last15DaysButtonDesign: false, 
      last30DaysButtonDesign: false, 
      last7DaysDate: attendaceReport_FOR_7Days,
      attendaceReport_FOR_7Days_Api_Data: attendaceReport_FOR_7Days_Api_Data,
      last15DaysDate: attendaceReport_FOR_15Days,
      attendaceReport_FOR_15Days_Api_Data: attendaceReport_FOR_15Days_Api_Data,
      last30DaysDate: attendaceReport_FOR_30Days,
      attendaceReport_FOR_30Days_Api_Data: attendaceReport_FOR_30Days_Api_Data
    }
  }
  static contextType = NetworkContext;
  

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {

      // today date
      const year = new Date().getFullYear();
      const monthNum = new Date().getMonth();
      const month = MonthShortcut[monthNum];
      const date = new Date().getDate();
      const todayDate = month + ' ' + date + ', ' + year;


      // last 7 days date
      const convertedForLast7Days_Date = new Date(new Date().getTime() - (7*24*60*60*1000));
      const last7Days_Date_Year = new Date(convertedForLast7Days_Date).getFullYear();
      const last7Days_monthNum = new Date(convertedForLast7Days_Date).getMonth();
      const last7Days_Date_Month = MonthShortcut[last7Days_monthNum];
      let last7Days_Date = new Date(convertedForLast7Days_Date).getDate();
      last7Days_Date.toString().length <= 1 ? last7Days_Date = '0' + last7Days_Date : last7Days_Date;
      const attendaceReport_FOR_7Days_Api_Data = last7Days_Date_Year + '/' + Number(last7Days_monthNum+1) + '/' + last7Days_Date;
      const attendaceReport_FOR_7Days = last7Days_Date_Month + ' ' + last7Days_Date + ', ' + last7Days_Date_Year;
      // console.log('attendaceReport_FOR_7Days ==> ', attendaceReport_FOR_7Days);


      // last 15 days date
      const convertedForLast15Days_Date = new Date(new Date().getTime() - (15*24*60*60*1000));
      const last15Days_Date_Year = new Date(convertedForLast15Days_Date).getFullYear();
      const last15Days_monthNum = new Date(convertedForLast15Days_Date).getMonth();
      const last15Days_Date_Month = MonthShortcut[last15Days_monthNum];
      let last15Days_Date = new Date(convertedForLast15Days_Date).getDate();
      last15Days_Date.toString().length <= 1 ? last15Days_Date = '0' + last15Days_Date : last15Days_Date;
      const attendaceReport_FOR_15Days_Api_Data = last15Days_Date_Year + '/' + Number(last15Days_monthNum+1) + '/' + last15Days_Date;
      const attendaceReport_FOR_15Days = last15Days_Date_Month + ' ' + last15Days_Date + ', ' + last15Days_Date_Year;
      // console.log('attendaceReport_FOR_15Days ==> ', attendaceReport_FOR_15Days);


      // last 30 days date
      const convertedForLast30Days_Date = new Date(new Date().getTime() - (30*24*60*60*1000));
      const last30Days_Date_Year = new Date(convertedForLast30Days_Date).getFullYear();
      const last30Days_monthNum = new Date(convertedForLast30Days_Date).getMonth();
      const last30Days_Date_Month = MonthShortcut[last30Days_monthNum];
      let last30Days_Date = new Date(convertedForLast30Days_Date).getDate();
      last30Days_Date.toString().length <= 1 ? last30Days_Date = '0' + last30Days_Date : last30Days_Date;
      const attendaceReport_FOR_30Days_Api_Data = last30Days_Date_Year + '/' + Number(last30Days_monthNum+1) + '/' + last30Days_Date;
      const attendaceReport_FOR_30Days = last30Days_Date_Month + ' ' + last30Days_Date + ', ' + last30Days_Date_Year;
      // console.log('attendaceReport_FOR_30Days ==> ', attendaceReport_FOR_30Days);


      this.setState({
        todayDate: todayDate,
        thisWeekButtonDesign: true, 
        last15DaysButtonDesign: false, 
        last30DaysButtonDesign: false, 
        last7DaysDate: attendaceReport_FOR_7Days,
        attendaceReport_FOR_7Days_Api_Data: attendaceReport_FOR_7Days_Api_Data,
        last15DaysDate: attendaceReport_FOR_15Days,
        attendaceReport_FOR_15Days_Api_Data: attendaceReport_FOR_15Days_Api_Data,
        last30DaysDate: attendaceReport_FOR_30Days,
        attendaceReport_FOR_30Days_Api_Data: attendaceReport_FOR_30Days_Api_Data
      });

      this.leaveType();
      this.thisWeekAttendanceReportHandler();
    });
  }

  componentWillUnmount = () => {
    this.focusListener();
  }


  thisWeekAttendanceReportHandler = () => {
    this.setState({
      thisWeekButtonDesign: true,
      last15DaysButtonDesign: false, 
      last30DaysButtonDesign: false, 
    }, () => {
      if(this.context.isConnected) {
        this.props.dispatch(viewTimelyAttendanceReportApi(this.state.attendaceReport_FOR_7Days_Api_Data));
  
      } else {
        obj = {
          activityIndicatorOrOkay: false,
          loaderStatus: true,
          loaderMessage: 'No Internet Connection'
        }
  
        this.props.dispatch(netInfo(obj));
      }
    })
  }

  lastFifteenDaysAttendanceReportHandler = () => {
    this.setState({
      thisWeekButtonDesign: false,
      last15DaysButtonDesign: true, 
      last30DaysButtonDesign: false, 
    }, () => {
      if(this.context.isConnected) {
        this.props.dispatch(viewTimelyAttendanceReportApi(this.state.attendaceReport_FOR_15Days_Api_Data));
  
      } else {
        obj = {
          activityIndicatorOrOkay: false,
          loaderStatus: true,
          loaderMessage: 'No Internet Connection'
        }
  
        this.props.dispatch(netInfo(obj));
      }
    })
  }

  lastThirtyDaysAttendanceReportHandler = () => {
    this.setState({
      thisWeekButtonDesign: false,
      last15DaysButtonDesign: false, 
      last30DaysButtonDesign: true, 
    }, () => {
      if(this.context.isConnected) {
        this.props.dispatch(viewTimelyAttendanceReportApi(this.state.attendaceReport_FOR_30Days_Api_Data));
  
      } else {
        obj = {
          activityIndicatorOrOkay: false,
          loaderStatus: true,
          loaderMessage: 'No Internet Connection'
        }
  
        this.props.dispatch(netInfo(obj));
      }
    })
  }


  leaveType = () => {
    if(this.context.isConnected) {
      this.props.dispatch(leaveTypeApi());

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
    // console.log('this.props.reports ==> ', this.props.reports);

    const leaveReportList = this.props.reports.leaveTypeArr.length > 0 ? this.props.reports.leaveTypeArr.map((obj, id) => {
      return (
        <View key={id} style={{ marginBottom: 12, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width:"50%" }}>
          <Text style={{ paddingHorizontal: 9, backgroundColor: obj.color }}></Text>
          <Text style={{ marginLeft: 15 }}>{obj.leaveName}</Text>
        </View>
      )
    }) : null;

    const leaveReportTable = this.props.reports.leaveTypeArr.length > 0 ? this.props.reports.leaveTypeArr.map((item, id) => {
      return (
        <View key={id}>
          <View style={styles.tableRow}>
            <Text style={{ textAlign: 'left' }}>{item.leaveName}</Text>
            <Text style={{ textAlign: 'left' }}>{item.remainingLeaveAllocatedDays != '' ? item.remainingLeaveAllocatedDays : item.leaveAllocatedDays}</Text>
            <Text style={{ textAlign: 'center' }}>{item.remainingLeaveAllocatedDays != '' ? item.leaveAllocatedDays - item.remainingLeaveAllocatedDays : 0}</Text>
          </View>
        </View>
      )
    }) : null;


    return(
      <View style={{ flex: 1 }}>
        <NinetyNineHeader title="Reports" isHome={true} navigation={this.props.navigation}  />

        <ScrollView>
          <View style={styles.bodyContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Attendace Report</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text>Showing from </Text>
              <Text>{this.state.thisWeekButtonDesign ? this.state.last7DaysDate : this.state.last15DaysButtonDesign ? this.state.last15DaysDate : this.state.last30DaysButtonDesign ? this.state.last30DaysDate : this.state.todayDate}</Text>
              <Text> to </Text>
              <Text>{this.state.todayDate}</Text>
            </View>

            <View style={styles.reportButtonsHorizontal}>
              <TouchableOpacity onPress={this.thisWeekAttendanceReportHandler}>
                <View style={this.state.thisWeekButtonDesign ? styles.reportButton : null}>
                  <Text style={{ color: this.state.thisWeekButtonDesign ? '#fff' : '#000' }}>This Week</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.lastFifteenDaysAttendanceReportHandler}>
              <View style={this.state.last15DaysButtonDesign ? styles.reportButton : null}>
                <Text style={{ color: this.state.last15DaysButtonDesign ? '#fff' : '#000' }}>Last 15 Days</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.lastThirtyDaysAttendanceReportHandler}>
              <View style={this.state.last30DaysButtonDesign ? styles.reportButton : null}>
                <Text style={{ color: this.state.last30DaysButtonDesign ? '#fff' : '#000' }}>Last 30 Days</Text>
              </View>
              </TouchableOpacity>
            </View>

            {
              this.props.reports.viewReportLineChart ? 
              <VictoryChart width={380} height={250} theme={VictoryTheme.material}>
                <VictoryLine
                  interpolation="natural"
                  data={this.props.reports.viewReportLineChart}
                />
              </VictoryChart> : 

              <VictoryChart width={380} height={250} theme={VictoryTheme.material}>
                <VictoryLine
                  interpolation="natural"
                  data={[
                    { x: '03-16', y: 12.8 },
                    { x: '03-13', y: 11.5 },
                    { x: '03-12', y: 11.1 },
                    { x: '03-11', y: 14.1 },
                    { x: '03-10', y: 9.3 },
                    { x: '02-29', y: 13.0 }
                  ]}
                />
              </VictoryChart>
            }
            
            
            <View style={{ height: 10 }}> 
              <Text>&nbsp;</Text>
            </View>

            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Leave Report</Text>

            {
              this.props.reports.leaveReportBarChart ?
              <VictoryChart width={380} height={250} theme={VictoryTheme.material}>
                <VictoryBar data={this.props.reports.leaveReportBarChart} x="leaveName" y="allocatedDays" />
              </VictoryChart> :

              <VictoryChart width={380} height={250} theme={VictoryTheme.material}>
                <VictoryBar data={data} x="quarter" y="earnings" />
              </VictoryChart>
            }


            <View style={{ padding: 10, flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', flexWrap: "wrap" }}>
              { leaveReportList }
            </View>

            {
              leaveReportTable ?
              <View style={{ padding: 10 }}>
                <View style={styles.tableHead}>
                  <Text style={{ color: '#fff' }}>Leave Type</Text>
                  <Text style={{ color: '#fff' }}>Available</Text>
                  <Text style={{ color: '#fff' }}>Taken</Text>
                </View>
                { leaveReportTable }
              </View> :
              null
            }
            
          </View>
        </ScrollView>

        <NinetyNineLoader />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 25,
  },
  reportButtonsHorizontal: { 
    marginTop: 12, 
    padding: 8, 
    borderWidth: 1,
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  reportButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'blue',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  tableHead: { 
    padding: 10, 
    backgroundColor: 'blue', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  },
  tableRow: { 
    borderLeftWidth: 1, 
    borderRightWidth: 1, 
    borderBottomWidth: 1, 
    paddingVertical: 5, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  }
})

const mapStateToProps = state => {
  return {
    reports: state.reports
  }
}

export default connect(mapStateToProps)(Reports);
