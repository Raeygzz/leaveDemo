import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CheckInOut from '../../Screens/CheckInOut/CheckInOut';


const CheckInOutStack = createStackNavigator();

export const CheckInOutNavigator = () => (
  <CheckInOutStack.Navigator headerMode='none'>
    <CheckInOutStack.Screen name="CheckInOut" component={CheckInOut}/>
  </CheckInOutStack.Navigator>
);
