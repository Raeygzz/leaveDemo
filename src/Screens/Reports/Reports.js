import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { MonthShortcut } from '../../Helper/Constants/Constant';
import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';

import { VictoryLine, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";


const data = [
  { quarter: 0, earnings: 0 },
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
  { quarter: 5, earnings: null },
];


export default class Reports extends Component {
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
    const attendaceReport_FOR_7Days = last7Days_Date_Month + ' ' + last7Days_Date + ', ' + last7Days_Date_Year;
    // console.log('attendaceReport_FOR_7Days ==> ', attendaceReport_FOR_7Days);


    // last 15 days date
    const convertedForLast15Days_Date = new Date(new Date().getTime() - (15*24*60*60*1000));
    const last15Days_Date_Year = new Date(convertedForLast15Days_Date).getFullYear();
    const last15Days_monthNum = new Date(convertedForLast15Days_Date).getMonth();
    const last15Days_Date_Month = MonthShortcut[last15Days_monthNum];
    let last15Days_Date = new Date(convertedForLast15Days_Date).getDate();
    last15Days_Date.toString().length <= 1 ? last15Days_Date = '0' + last15Days_Date : last15Days_Date;
    const attendaceReport_FOR_15Days = last15Days_Date_Month + ' ' + last15Days_Date + ', ' + last15Days_Date_Year;
    // console.log('attendaceReport_FOR_15Days ==> ', attendaceReport_FOR_15Days);


    // last 30 days date
    const convertedForLast30Days_Date = new Date(new Date().getTime() - (30*24*60*60*1000));
    const last30Days_Date_Year = new Date(convertedForLast30Days_Date).getFullYear();
    const last30Days_monthNum = new Date(convertedForLast30Days_Date).getMonth();
    const last30Days_Date_Month = MonthShortcut[last30Days_monthNum];
    let last30Days_Date = new Date(convertedForLast30Days_Date).getDate();
    last30Days_Date.toString().length <= 1 ? last30Days_Date = '0' + last30Days_Date : last30Days_Date;
    const attendaceReport_FOR_30Days = last30Days_Date_Month + ' ' + last30Days_Date + ', ' + last30Days_Date_Year;
    // console.log('attendaceReport_FOR_30Days ==> ', attendaceReport_FOR_30Days);

    
    this.state = {
      todayDate: todayDate,
      thisWeekButtonDesign: true, 
      last15DaysButtonDesign: false, 
      last30DaysButtonDesign: false, 
      last7DaysDate: attendaceReport_FOR_7Days,
      last15DaysDate: attendaceReport_FOR_15Days,
      last30DaysDate: attendaceReport_FOR_30Days
    }
  }
  

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
      const attendaceReport_FOR_7Days = last7Days_Date_Month + ' ' + last7Days_Date + ', ' + last7Days_Date_Year;
      // console.log('attendaceReport_FOR_7Days ==> ', attendaceReport_FOR_7Days);


      // last 15 days date
      const convertedForLast15Days_Date = new Date(new Date().getTime() - (15*24*60*60*1000));
      const last15Days_Date_Year = new Date(convertedForLast15Days_Date).getFullYear();
      const last15Days_monthNum = new Date(convertedForLast15Days_Date).getMonth();
      const last15Days_Date_Month = MonthShortcut[last15Days_monthNum];
      let last15Days_Date = new Date(convertedForLast15Days_Date).getDate();
      last15Days_Date.toString().length <= 1 ? last15Days_Date = '0' + last15Days_Date : last15Days_Date;
      const attendaceReport_FOR_15Days = last15Days_Date_Month + ' ' + last15Days_Date + ', ' + last15Days_Date_Year;
      // console.log('attendaceReport_FOR_15Days ==> ', attendaceReport_FOR_15Days);


      // last 30 days date
      const convertedForLast30Days_Date = new Date(new Date().getTime() - (30*24*60*60*1000));
      const last30Days_Date_Year = new Date(convertedForLast30Days_Date).getFullYear();
      const last30Days_monthNum = new Date(convertedForLast30Days_Date).getMonth();
      const last30Days_Date_Month = MonthShortcut[last30Days_monthNum];
      let last30Days_Date = new Date(convertedForLast30Days_Date).getDate();
      last30Days_Date.toString().length <= 1 ? last30Days_Date = '0' + last30Days_Date : last30Days_Date;
      const attendaceReport_FOR_30Days = last30Days_Date_Month + ' ' + last30Days_Date + ', ' + last30Days_Date_Year;
      // console.log('attendaceReport_FOR_30Days ==> ', attendaceReport_FOR_30Days);


      this.setState({
        todayDate: todayDate,
        thisWeekButtonDesign: true, 
        last15DaysButtonDesign: false, 
        last30DaysButtonDesign: false, 
        last7DaysDate: attendaceReport_FOR_7Days,
        last15DaysDate: attendaceReport_FOR_15Days,
        last30DaysDate: attendaceReport_FOR_30Days
      });
    });
  }

  componentWillUnmount = () => {
    this.focusListener();
  }


  thisWeekReportHandler = () => {
    this.setState({
      thisWeekButtonDesign: true,
      last15DaysButtonDesign: false, 
      last30DaysButtonDesign: false, 
    })
    // console.log('this week report handler')
  }

  lastFifteenDaysReportHandler = () => {
    this.setState({
      thisWeekButtonDesign: false,
      last15DaysButtonDesign: true, 
      last30DaysButtonDesign: false, 
    })
    // console.log('last fifteen days report handler')
  }

  lastThirtyDaysReportHandler = () => {
    this.setState({
      thisWeekButtonDesign: false,
      last15DaysButtonDesign: false, 
      last30DaysButtonDesign: true, 
    })
    // console.log('last thirty days report handler')
  }


  render() {
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
              <TouchableOpacity onPress={this.thisWeekReportHandler}>
                <View style={this.state.thisWeekButtonDesign ? styles.reportButton : null}>
                  <Text style={{ color: this.state.thisWeekButtonDesign ? '#fff' : '#000' }}>This Week</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.lastFifteenDaysReportHandler}>
              <View style={this.state.last15DaysButtonDesign ? styles.reportButton : null}>
                <Text style={{ color: this.state.last15DaysButtonDesign ? '#fff' : '#000' }}>Last 15 Days</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.lastThirtyDaysReportHandler}>
              <View style={this.state.last30DaysButtonDesign ? styles.reportButton : null}>
                <Text style={{ color: this.state.last30DaysButtonDesign ? '#fff' : '#000' }}>Last 30 Days</Text>
              </View>
              </TouchableOpacity>
            </View>

            <VictoryChart width={380} height={250} theme={VictoryTheme.material}>
              <VictoryLine
                interpolation="natural"
                data={[
                  { x: 1, y: 1 },
                  { x: 1, y: 1.5 },
                  { x: 1.5, y: 1.5 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 6 }
                ]}
              />
            </VictoryChart>
            
            <View style={{ height: 10 }}> 
              <Text>&nbsp;</Text>
            </View>

            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Leave Report</Text>

            <VictoryChart width={380} height={250} theme={VictoryTheme.material}>
              <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>

            <View>
              <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Text style={{ paddingHorizontal: 9, backgroundColor: 'blue' }}></Text>
                  <Text style={{ marginLeft: 15 }}>Annual Paid</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Text style={{ paddingHorizontal: 9, backgroundColor: 'darkorange' }}></Text>
                  <Text style={{ marginLeft: 15 }}>Annual Unpaid</Text>
                </View>
              </View>

              <View style={{ paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Text style={{ paddingHorizontal: 9, backgroundColor: 'lightpink' }}></Text>
                  <Text style={{ marginLeft: 15 }}>Annual Sick</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Text style={{ paddingHorizontal: 9, backgroundColor: 'crimson' }}></Text>
                  <Text style={{ marginLeft: 15 }}>Marriage Leave</Text>
                </View>
              </View>

              <View style={{ marginBottom: 20, marginLeft: 25, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ paddingHorizontal: 9, backgroundColor: 'purple' }}></Text>
                <Text style={{ marginLeft: 15 }}>Mourning Leave</Text>
              </View>
            </View>

            <View style={{ paddingLeft: 20 }}>
              <View style={styles.tableHead}>
                <Text style={{ color: '#fff' }}>Leave Type</Text>
                <Text style={{ color: '#fff' }}>Available</Text>
                <Text style={{ color: '#fff' }}>Taken</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={{ textAlign: 'left' }}>Annual Paid</Text>
                <Text style={{ textAlign: 'left' }}>8</Text>
                <Text style={{ textAlign: 'center' }}>2</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={{ textAlign: 'left' }}>Annual Unpaid</Text>
                <Text style={{ textAlign: 'left' }}>8</Text>
                <Text style={{ textAlign: 'center' }}>2</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={{ textAlign: 'left' }}>Annual Sick</Text>
                <Text style={{ textAlign: 'left' }}>8</Text>
                <Text style={{ textAlign: 'center' }}>2</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={{ textAlign: 'left' }}>Marriage Leave</Text>
                <Text style={{ textAlign: 'left' }}>8</Text>
                <Text style={{ textAlign: 'center' }}>2</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={{ textAlign: 'left' }}>Mourning Leave</Text>
                <Text style={{ textAlign: 'left' }}>8</Text>
                <Text style={{ textAlign: 'center' }}>2</Text>
              </View>
            </View>
            
          </View>
        </ScrollView>
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
