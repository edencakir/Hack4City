import React from 'react';
import Home from './screens/Home';
import { StackNavigator } from 'react-navigation';

const MainStack = StackNavigator({
  Home: {
    screen: Home
  }
});

export default MainStack;
