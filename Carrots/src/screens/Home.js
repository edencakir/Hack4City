import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  DeviceEventEmitter,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scanning: false,
    status: 'Durağa Geldim'
    //top: new Animated.Value(Dimensions.get('window').height / 2 - 150)
  };

  componentDidMount() {}

  componentWillUnmount() {
    const region = {
      identifier: 'iBeacon',
      uuid: 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961'
    };
    // stop ranging beacons:
    Beacons.stopRangingBeaconsInRegion(region.identifier, region.uuid)
      .then(() => console.log('Beacons ranging stopped succesfully'))
      .catch(error =>
        console.log(`Beacons ranging not stopped, error: ${error}`)
      );

    // remove ranging event we registered at componentDidMount
    DeviceEventEmitter.removeListener('beaconsDidRange');
  }

  scanBeacons = () => {
    this.setState({ scanning: true, status: 'Durak Aranıyor' });
    setTimeout(() => {
      this.setState({
        scanning: false,
        status: 'Durağa Geldim'
      });
      this.props.navigation.navigate('TabBar', {
        title: 'Bostanlı'
      });
    }, 100);
    //Animated.timing(this.state.top, {
    //  toValue: 20
    //}).start();
    // Define a region which can be identifier + uuid,
    // identifier + uuid + major or identifier + uuid + major + minor
    // (minor and major properties are numbers)
    const region = {
      identifier: 'iBeacon',
      uuid: 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961'
    };

    // Request for authorization while the app is open

    if (Platform.OS === 'ios') {
      Beacons.requestWhenInUseAuthorization();
      Beacons.startMonitoringForRegion(region);
      Beacons.startRangingBeaconsInRegion(region);
      Beacons.startUpdatingLocation();
    } else {
      Beacons.detectIBeacons();
      // Range beacons inside the region
      Beacons.startRangingBeaconsInRegion(region.identifier, region.uuid)
        .then(() => console.log('Beacons ranging started succesfully'))
        .catch(error =>
          console.log(`Beacons ranging not started, error: ${error}`)
        );
    }

    // Listen for beacon changes
    const subscription = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      this.onBeaconRange
    );
  };

  onBeaconRange = data => {
    console.log(data);
    this.setState({
      scanning: false,
      status: 'Durağa Geldim'
    });
    if (
      (data.beacons && data.beacons[0] && data.beacons[0].uuid) ===
        'e20a39f4-73f5-4bc4-a12f-17d1ad07a961' ||
      data.uuid === 'e20a39f4-73f5-4bc4-a12f-17d1ad07a961'
    ) {
      // console.log('success');
    }
    // data.region - The current region
    // data.region.identifier
    // data.region.uuid

    // data.beacons - Array of all beacons inside a region
    //  in the following structure:
    //    .uuid
    //    .major - The major version of a beacon
    //    .minor - The minor version of a beacon
    //    .rssi - Signal strength: RSSI value (between -100 and 0)
    //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
    //    .accuracy - The accuracy of a beacon
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{ alignItems: 'center', top: -20 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.scanBeacons}
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'lightblue'
            }}
          >
            {this.state.scanning ? (
              <ActivityIndicator color={'white'} size={'large'} />
            ) : (
              <Icon name={'md-pin'} size={54} color={'orange'} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    justifyContent: 'center'
  }
});