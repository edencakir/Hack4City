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

export default class VehicleStatus extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.vehicleStatusTitle,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon name={'routes'} size={20} color={tintColor} />
    ),
    headerBackTitle: 'Geri',
    headerTruncatedBackTitle: 'Geri'
  });

  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>
          VehicleStatus {this.props.navigation.state.params.vehicleStatusTitle}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
