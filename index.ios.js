/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class piggs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.top}>top</Text>
        <Text style={styles.mid}>mid</Text>
        <Text style={styles.bottom}>bottom</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    fontSize: 20,
  },
  mid: {
    fontSize: 20,
  },
  bottom: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('piggs', () => piggs);
