import React from 'react';
import 'react-native-gesture-handler';

import { StyleSheet, View } from 'react-native';

import AuthNavigation from './AuthNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
