import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../../Screens/Dashboard/Dashboard';


const DashboardStack = createStackNavigator();

export const DashboardNavigator = () => (
  <DashboardStack.Navigator headerMode='none'>
    <DashboardStack.Screen name="Dashboard" component={Dashboard}/>
  </DashboardStack.Navigator>
);
