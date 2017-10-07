import React from 'react';
import Home from './screens/Home';
import MapScreen from './screens/MapScreen';
import BusStop from './screens/BusStop';

import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from 'react-navigation';

const FirstTab = StackNavigator({
  Bus: {
    screen: BusStop
  }
});

const SecondTab = StackNavigator({
  Map: {
    screen: MapScreen,
    title: 'Harita'
  }
});

const MainScreenNavigator = TabNavigator(
  {
    FirstTab: { screen: FirstTab },
    SecondTab: { screen: SecondTab }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: 'white',
      inactiveBackgroundColor: '#ececec',
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      showIcon: true
    }
  }
);

FirstTab.navigationOptions = {
  title: 'Rota'
};

SecondTab.navigationOptions = {
  title: 'Harita'
};

const MainStack = StackNavigator(
  {
    Home: {
      screen: Home
    },
    TabBar: {
      screen: MainScreenNavigator
    }
  },
  {
    headerMode: 'none'
  }
);

export default MainStack;
