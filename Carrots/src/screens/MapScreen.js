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
import { GOOGLE_MAPS_API_KEY } from '../utility/Constants';

export const decode = function(t, e) {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return (d = d.map(function(t) {
    return { latitude: t[0], longitude: t[1] };
  }));
};

const getRouteURL = (org, dest) => {
  const mode = 'driving'; // 'walking';
  const origin = '38.457952,27.0890082';
  const destination = '38.4541002,27.1991632';
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}&mode=${mode}`;
};

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

  componentDidMount() {
    this.getRoute();
  }

  getRouteURL = (org, dest, status) => {
    const mode = 'driving'; // 'walking';
    const origin = '38.457952,27.0890082';
    const destination = dest;
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}&mode=${mode}`;
    return url;
  };

  getRoute = () => {
    console.log(this.props.destination.lat, this.props.destination.lng);
    let dest =
      '' + this.props.destination.lat + ',' + this.props.destination.lng;
    console.log(dest, 'destination');
    let url = this.getRouteURL(null, dest, null);
    console.log('url', url);
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.routes.length) {
          this.setState({
            route: decode(responseJson.routes[0].overview_polyline.points),
            region: {
              latitude: this.props.destination.lat,
              longitude: this.props.destination.lng,
              latitudeDelta: 0.1022,
              longitudeDelta: 0.0421
            }
          });
        }
      })
      .catch(e => {
        console.warn(e);
      });
  };

  render() {
    return (
      <MapView
        style={styles.map}
        region={this.state.region}
        initialRegion={{
          latitude: 38.457952,
          longitude: 27.0890082,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
        <MapView.Polyline
          coordinates={this.state.route}
          strokeWidth={4}
          strokeColor={'red'}
        />
        <MapView.Polyline
          coordinates={this.state.route}
          strokeWidth={4}
          strokeColor={'blue'}
        />
        <MapView.Polyline
          coordinates={this.state.route}
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
