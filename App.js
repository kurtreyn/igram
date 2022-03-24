import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { firebase, db } from './firebase';
import AuthNavigation from './AuthNavigation';

import KURT_PROFILE_PIC from './assets/kr-profile.jpg';
const kurtProfilePic = Image.resolveAssetSource(KURT_PROFILE_PIC).uri;

export default function App() {
  const user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      // console.log(displayName);
      // console.log(photoURL);
    } else {
    }
  });

  // THIS WORKS
  // function updateProfile() {
  //   user
  //     .updateProfile({
  //       displayName: 'Kurt',
  //       photoURL: kurtProfilePic,
  //     })
  //     .then(() => {
  //       console.log('update successful');
  //       console.log(
  //         `-----NEW displayName: ${user.displayName}, photoURL: ${user.photoURL}`
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }

  // useEffect(() => {
  //   updateProfile();
  // }, []);

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
