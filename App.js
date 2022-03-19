import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
// import AuthNavigation from './AuthNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen /> */}
      <SignupScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
