import React from 'react';
import Home from './screens/Home';
import MetroStop from './screens/MetroStop';
import BusStop from './screens/BusStop';
import ShipStop from './screens/ShipStop';
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
  Metro: {
    screen: MetroStop
  }
});

const ThirdTab = StackNavigator({
  Ship: {
    screen: ShipStop
  }
});

const MainScreenNavigator = TabNavigator(
  {
    FirstTab: { screen: FirstTab },
    SecondTab: { screen: SecondTab },
    ThirdTab: { screen: ThirdTab }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: 'orange',
      inactiveBackgroundColor: 'black',
      activeTintColor: 'red',
      inactiveTintColor: 'white',
      showIcon: true
    }
  }
);

FirstTab.navigationOptions = {
  title: 'Otobüs'
};

SecondTab.navigationOptions = {
  title: 'Metro'
};

ThirdTab.navigationOptions = {
  title: 'Vapur'
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
