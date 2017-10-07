import React from 'react';
import { Platform } from 'react-native';
import Home from './screens/Home';
import MapScreen from './screens/MapScreen';
import BusStop from './screens/BusStop';
import VehicleStatus from './screens/VehicleStatus';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from 'react-navigation';

const FirstTab = StackNavigator({
  Bus: {
    screen: BusStop
  },
  VehicleStatus: {
    screen: VehicleStatus
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
    tabBarPosition: 'bottom',
    tabBarOptions: {
      tabStyle: {
        backgroundColor: '#ececec',
        flexDirection: Platform.select({ android: 'row', ios: 'column' })
      },
      style: {
        backgroundColor: 'white'
      },
      indicatorStyle: {
        backgroundColor: 'white'
      },
      upperCaseLabel: false,
      activeBackgroundColor: 'white',
      inactiveBackgroundColor: '#ececec',
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      showIcon: true,
      labelStyle: {
        fontSize: 14,
        fontWeight: Platform.select({ ios: 'normal', android: 'bold' })
      },
      iconStyle: { marginTop: 1 }
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
