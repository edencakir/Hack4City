import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '../utility/Constants';

const getRouteURL = (org, dest) => {
  const mode = 'driving'; // 'walking';
  const origin = '38.457952,27.0890082';
  const destination = '38.4541002,27.1991632';
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}&mode=${mode}`;
};

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Harita',
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon name={'map'} size={20} style={{}} color={tintColor} />
    )
  });

  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <MapView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
