import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { firebase, db } from './firebase';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
// import AuthNavigation from './AuthNavigation';

import TEMP_PROFILE_PIC from './assets/profile-avatar.png';
const tempProfilePic = Image.resolveAssetSource(TEMP_PROFILE_PIC).uri;

export default function App() {
  const user = firebase.auth().currentUser;
  const usersCollectionRef = db.collectionGroup('users');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      console.log(displayName);
      console.log(photoURL);
    } else {
    }
  });

  function updateProfile() {
    user
      .updateProfile({
        displayName: 'USER NAME',
        photoURL: tempProfilePic,
      })
      .then(() => {
        console.log('update successful');
        console.log(
          `-----NEW displayName: ${user.displayName}, photoURL: ${user.photoURL}`
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    updateProfile();
  });

  return (
    <View style={styles.container}>
      <HomeScreen />
      {/* <SignupScreen /> */}
      {/* <LoginScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
