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
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';

import { getDestination, setTransportation } from '../store/app/actions';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Harita',
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon name={'map'} size={20} style={{}} color={tintColor} />
    )
  });

  state = {
    region: {
      latitude: 38.457952,
      longitude: 27.0890082,
      latitudeDelta: 0.1022,
      longitudeDelta: 0.0421
    },
    route: [],
    mode: 'driving'
  };

  render() {
    return (
      <MapView
        style={styles.map}
        region={{
          ...this.props.destination.path[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        initialRegion={{
          latitude: 38.457952,
          longitude: 27.0890082,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
        <MapView.Polyline
          coordinates={this.props.destination.path}
          strokeWidth={4}
          strokeColor={'green'}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

const mapToState = ({ appReducer }) => ({
  destination: appReducer.destination,
  transport: appReducer.transport
});

export default connect(mapToState, null)(MapScreen);
