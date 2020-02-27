import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CheckInOutNavigator } from './CheckInOutStack';
import { EventsNavigator } from './EventsStack';
import { ApplyLeaveNavigator } from './ApplyLeaveStack';

import { DashboardNavigator } from './DashboardStack';
import { ReportsNavigator } from './ReportsStack';
import { SettingsNavigator } from './SettingsStack';


import Icon from 'react-native-vector-icons/FontAwesome5';


const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const HomeBottomNavigator = ({ navigation, route }) => (
  <BottomTab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name == "CheckInOut") {
          iconName = "check";
        } else if (route.name == "Home") {
          iconName = "home";
        } else if (route.name == "ApplyLeave") {
          iconName = "calendar-check";
        }
        return <Icon name={iconName} size={size} color={color} />;
      }
    })}
  >
    <BottomTab.Screen
      name="CheckInOut"
      component={CheckInOutNavigator}
      options={{ title: 'Attendance' }}
    />
    <BottomTab.Screen
      name="Home"
      component={EventsNavigator}
      options={{ title: 'Events/Anouncement' }}
    />
    <BottomTab.Screen
      name="ApplyLeave"
      component={ApplyLeaveNavigator}
      options={{ title: 'Apply Leave' }}
    />
  </BottomTab.Navigator>
);

export const MainNavigator = () => (
  <Drawer.Navigator initialRouteName="Home"
    drawerStyle={{
      backgroundColor: '#f8f8f8',
      width: 240,
    }}
    drawerContentOptions={{
      activeTintColor: '#e91e63',
      itemStyle: { marginVertical: 5 },
    }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeBottomNavigator}
      options={{ title: 'Home' }}
      // options={{ title: '' }}
    />
    <Drawer.Screen
      name="Dashboard"
      component={DashboardNavigator}
      options={{ title: 'Dashboard' }}
    />
    <Drawer.Screen
      name="CheckInOut"
      component={HomeBottomNavigator}
      options={{ title: 'Attendance' }}
    />
    {/* <Drawer.Screen
      name="ApplyLeave"
      component={HomeBottomNavigator}
      options={{ title: 'Apply Leave' }}
    />
    <Drawer.Screen
      name="Events"
      component={HomeBottomNavigator}
      options={{ title: 'Events' }}
    /> */}
    <Drawer.Screen
      name="Reports"
      component={ReportsNavigator}
      options={{ title: 'Reports' }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingsNavigator}
      options={{ title: 'Settings' }}
      // options={{ drawerLabel: 'Settings' }}
    />
  </Drawer.Navigator>
);