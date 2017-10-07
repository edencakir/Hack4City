import React from 'react';
import Home from './screens/Home';
import BusStop from './screens/BusStop';
import { StackNavigator } from 'react-navigation';

const MainStack = StackNavigator({
  Home: {
    screen: Home
  },
  BusStop: {
    screen: BusStop
  }
});

export default MainStack;
