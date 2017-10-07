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
import Icon from 'react-native-vector-icons/Ionicons';
import busStop from '../assets/img/busstop.jpg';

export default class BusStop extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Image source={busStop} style={styles.stopImage} />
        <Text />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  stopImage: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'cover'
  }
});
