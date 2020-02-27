import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ApplyLeave from '../../Screens/ApplyLeave/ApplyLeave';


const ApplyLeaveStack = createStackNavigator();

export const ApplyLeaveNavigator = () => (
  <ApplyLeaveStack.Navigator headerMode='none'>
    <ApplyLeaveStack.Screen name="ApplyLeave" component={ApplyLeave}/>
  </ApplyLeaveStack.Navigator>
);
