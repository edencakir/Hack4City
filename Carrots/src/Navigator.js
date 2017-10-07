import React from 'react';
import Home from './screens/Home';
import MetroStop from './screens/MetroStop';
import BusStop from './screens/BusStop';
import ShipStop from './screens/ShipStop';
import TramStop from './screens/TramStop';
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

const FourthTab = StackNavigator({
  Tram: {
    screen: TramStop
  }
});

const MainScreenNavigator = TabNavigator(
  {
    FirstTab: { screen: FirstTab },
    SecondTab: { screen: SecondTab },
    ThirdTab: { screen: ThirdTab },
    FourthTab: { screen: FourthTab }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: 'orange',
      inactiveBackgroundColor: 'black',
      activeTintColor: 'black',
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

FourthTab.navigationOptions = {
  title: 'Tramvay'
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
