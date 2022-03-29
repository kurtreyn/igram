import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { firebase } from './firebase';
import AuthNavigation from './AuthNavigation';

export default function App() {
  // const user = firebase.auth().currentUser;

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     const displayName = user.displayName;
  //     const photoURL = user.photoURL;
  //   }
  // });

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
