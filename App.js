import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { firebase, db } from './firebase';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import AuthNavigation from './AuthNavigation';



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
    <Provider store={Store}>
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