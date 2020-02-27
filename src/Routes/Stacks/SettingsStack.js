import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from '../../Screens/Settings/Settings';
import ResetFingerprint from '../../Screens/ResetFingerprint/ResetFingerprint';


const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => (
  <SettingsStack.Navigator headerMode='none'>
    <SettingsStack.Screen name="Settings" component={Settings} />
    <SettingsStack.Screen name="ResetFingerprint" component={ResetFingerprint} />
  </SettingsStack.Navigator>
);
