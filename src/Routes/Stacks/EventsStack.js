import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Events from '../../Screens/Events/Events';
import EventDetail from '../../Screens/EventDetail/EventDetail';


const EventsStack = createStackNavigator();

export const EventsNavigator = () => (
  <EventsStack.Navigator headerMode='none'>
    <EventsStack.Screen name="Events" component={Events}/>
    <EventsStack.Screen name="EventDetail" component={EventDetail}/>
  </EventsStack.Navigator>
);
