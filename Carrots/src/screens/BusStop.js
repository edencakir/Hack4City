import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import busStop from '../assets/img/busstop.jpg';

export default class BusStop extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon name={'route'} size={20} style={{}} color={tintColor} />
    )
  });

  state = {
    locationSelected: false
  };

  onLocationSelect = () => {
    this.setState({
      locationSelected: true
    });
  };

  renderSearch = () => (
    <GooglePlacesAutocomplete
      placeholder="Gitmek istediğiniz konumu giriniz"
      minLength={1}
      autoFocus={true}
      returnKeyType={'search'}
      fetchDetails={true}
      textInputProps={{
        fontSize: 16,
        underlineColorAndroid: 'transparent'
      }}
      enablePoweredByContainer={false}
      styles={{
        textInputContainer: {
          marginHorizontal: 2,
          backgroundColor: '#ececec',
          borderTopWidth: 0,
          borderBottomWidth: 0
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          color: '#333',
          fontSize: 18
        },
        row: {
          backgroundColor: 'white'
        },
        description: {
          color: '#333'
        }
      }}
      onPress={this.onLocationSelect}
      currentLocation={false}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance'
        // types: 'food'
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3'
      ]}
      query={{
        key: 'AIzaSyA4TwMCx_lQijlVQqs_MWHuR1QJOKlQ_BM',
        language: 'tr'
        //types: '(cities)'
      }}
    />
  );

  renderDestination = () => (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.buttonTransit, { backgroundColor: 'darkblue' }]}
      >
        <Icon size={24} color={'white'} name={'md-bus'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonTransit, { backgroundColor: 'orange' }]}
      >
        <Icon size={24} color={'white'} name={'md-car'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonTransit, { backgroundColor: 'pink' }]}
      >
        <Icon size={24} color={'white'} name={'md-bicycle'} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { locationSelected } = this.state;
    return (
      <View style={styles.container}>
        <Image source={busStop} style={styles.stopImage} />
        {/*<Text style={styles.header}>Gitmek İstediğiniz Konum</Text>*/}
        {locationSelected ? this.renderDestination() : this.renderSearch()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  stopImage: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'cover'
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonTransit: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
