import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { firebase, db } from './firebase';
import configureStore from './redux/store';
import AuthNavigation from './AuthNavigation';
import { name as appName } from './app.json';
import KURT_PROFILE_PIC from './assets/kr-profile.jpg';
const kurtProfilePic = Image.resolveAssetSource(KURT_PROFILE_PIC).uri;

const store = configureStore();

export default function App() {
  const user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
    }
  });

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AuthNavigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
