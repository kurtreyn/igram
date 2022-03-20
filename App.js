import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
// import AuthNavigation from './AuthNavigation';

export default function App() {
  const user = firebase.auth().currentUser;
  // console.log(user);

  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
  }

  console.log(user.email);

  return (
    <View style={styles.container}>
      {/* <HomeScreen /> */}
      {/* <SignupScreen /> */}
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
