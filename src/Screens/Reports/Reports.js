import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';

import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";


const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];


export default class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  static navigationOptions = {
    headerShown: false
  };


  thisWeekReportHandler = () => {
    console.log('this week report handler')
  }

  lastFifteenDaysReportHandler = () => {
    console.log('last fifteen days report handler')
  }

  lastThirtyDaysReportHandler = () => {
    console.log('last thirty days report handler')
  }


  render() {
    return(
      <View style={{ flex: 1 }}>
        <NinetyNineHeader title="Reports" isHome={true} navigation={this.props.navigation}  />

        <View style={styles.bodyContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Attendace Report</Text>
          <Text>Showing from Jan 02, 2020 to Jan 06, 2020</Text>

          <View style={{ marginTop: 30, padding: 15, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.thisWeekReportHandler}>
              <Text>This Week</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.lastFifteenDaysReportHandler}>
              <Text>Last 15 Days</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.lastThirtyDaysReportHandler}>
              <Text>Last 30 Days</Text>
            </TouchableOpacity>
          </View>

          <VictoryBar />
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="quarter" y="earnings" />
          </VictoryChart>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 25,
  }
})
