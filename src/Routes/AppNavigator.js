import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator } from './Stacks/AuthStack';
import { MainNavigator } from './Stacks/MainStack';

import { navigationRef } from './RootNavigation';


const Stack = createStackNavigator();


export const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);
