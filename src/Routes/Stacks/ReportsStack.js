import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Reports from '../../Screens/Reports/Reports';


const ReportsStack = createStackNavigator();

export const ReportsNavigator = () => (
  <ReportsStack.Navigator headerMode='none'>
    <ReportsStack.Screen name="Reports" component={Reports}/>
  </ReportsStack.Navigator>
);
