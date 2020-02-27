import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../Screens/Login/Login';
// import Dashboard from '../../screens/Dashboard/Dashboard';
import ForgotPassword from '../../Screens/ForgotPassword/ForgotPassword';
import ResetLink from '../../Screens/ResetLink/ResetLink';


const AuthStack = createStackNavigator();

export const AuthNavigator = () => (
  <AuthStack.Navigator headerMode='none'>
    <AuthStack.Screen name="Login" component={Login}/>
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword}/>
    <AuthStack.Screen name="ResetLink" component={ResetLink}/>
  </AuthStack.Navigator>
);
