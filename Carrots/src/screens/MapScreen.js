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

export default class MetroStop extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Harita',
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon name={'map'} size={20} style={{}} color={tintColor} />
    )
  });

  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>MetroStop</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
