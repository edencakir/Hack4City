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

export default class TramStop extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'black'
    },
    headerTitleStyle: { color: 'white' },
    title: navigation.state.params.title,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon name={'tram'} size={20} style={{}} color={tintColor} />
    )
  });

  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>TramStop</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
