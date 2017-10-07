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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DirectionIcon from 'react-native-vector-icons/Ionicons';
import { getDestination } from '../store/app/actions';
import { connect } from 'react-redux';
import busStop from '../assets/img/busstop.jpg';
import konak from '../assets/img/konak.jpg';

class BusStop extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    tabBarIcon: ({ tintColor }) => (
      <Icon name={'routes'} size={20} style={{}} color={tintColor} />
    )
  });

  state = {
    locationSelected: false,
    destination: { lat: 0, lng: 0 }
  };
  routes = [
    {
      iconName: 'bus',
      title: 'Otobüs',
      color: 'blue',
      target: 'bus',
      description: 'Sizin için en hızlı ulaşım yolu ancak vasıta kalabalık.'
    },
    {
      iconName: 'tram',
      title: 'Tramvay',
      color: 'orange',
      target: 'tram',
      description: 'Yavaş ve sarsıntısız bir yolculuk.'
    },
    {
      iconName: 'bike',
      title: 'Bisiklet',
      color: 'green',
      target: 'bike',
      description: 'Sağlıklı yaşam!'
    },
    {
      iconName: 'train',
      title: 'İzban',
      color: 'red',
      target: 'train',
      description:
        'İstasyona gidişiniz 15 dakika, vardığınızda tren çok geçmeden gelmiş olacak.'
    }
  ];

  onLocationSelect = (data, details) => {
    this.setState({
      locationSelected: true,
      destination: {
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng
      }
    });
    this.props.navigation.setParams({ title: 'Bostanlı - Konak' });
    this.props.getDestination(this.state.destination);
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


  renderImages = () => {
    const { locationSelected } = this.state;
    if (locationSelected) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={busStop}
            style={[
              styles.stopImage,
              { width: Dimensions.get('window').width / 2 }
            ]}
          />
          <Image
            source={konak}
            style={[
              styles.stopImage,
              { width: Dimensions.get('window').width / 2 }
            ]}
          />
        </View>
      );
    }
    return <Image source={busStop} style={styles.stopImage} />;
  };

  renderDestination = () => {
    return this.routes.map((route, index) => (
      <View style={{}} key={index}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate('VehicleStatus', {
              vehicleStatusTitle: route.title
            })}
          style={styles.buttonTransit}
        >
          <Icon name={route.iconName} color={'grey'} size={28} />
          <View style={{ marginLeft: 12, marginRight: 8, flex: 1 }}>
            <Text style={styles.textTransit}>{route.title}</Text>
            <Text style={styles.descriptionTransit}>{route.description}</Text>
          </View>
          <DirectionIcon name={'ios-arrow-forward'} color={'grey'} size={28} />
        </TouchableOpacity>
        {this.routes.length - 1 === index ? (
          <View />
        ) : (
          <View
            style={{
              backgroundColor: 'lightgrey',
              height: StyleSheet.hairlineWidth
            }}
          />
        )}
      </View>
    ));
  };

  render() {
    const { locationSelected } = this.state;
    return (
      <View style={styles.container}>
        {this.renderImages()}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  textTransit: {
    fontWeight: 'bold',
    fontSize: 14
  },
  descriptionTransit: {
    marginTop: 1,
    fontSize: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const mapToState = ({ appReducer }) => ({
  destination: appReducer.destination
});

export default connect(mapToState, { getDestination })(BusStop);
