import React from 'react';
import { Alert } from 'react-native';
import { firebase, db } from '../firebase';
import 'firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const user = firebase.auth().currentUser;
export const uuid = uuidv4();
export let downloadURL = null;
export let dsetprog = null;

export const saveImage = async (uri, caption) => {
  //   console.log(loading);
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    let filename = `${uuid}.png`;

    const storageRef = firebase
      .storage()
      .ref()
      .child('postImages/' + filename);

    const uploadTask = storageRef.put(blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        dsetprog = snapshot.bytesTransferred / snapshot.totalBytes;
        console.log('Upload is ' + dsetprog + '% done');

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        Alert.alert(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          downloadURL = url;
          console.log(`downloadURL is: ${url}`);
          postImage(downloadURL, caption);
        });
      }
    );
  } catch (error) {
    console.log(error);
    Alert.alert(error.message);
  }
};

export const postImage = async (img, caption) => {
  try {
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts')
      .add({
        imageUrl: img,
        user: user.displayName,
        profile_picture: user.photoURL,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        likes_by_users: [],
        comments: [],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    //   .then(() => navigation.push('HomeScreen'));
    return unsubscribe;
  } catch (error) {
    Alert.alert(error.message);
  }
};

// export const handlePost = async function (
//   dsetloadtrue,
//   dsetloadfalse,
//   dsetprog
// ) {
//   if (!dsetloadtrue) {
//     try {
//       const response = await saveImage(imageUrl, dsetloadtrue, dsetprog).then(
//         (response) => postImage(downloadURL, caption, dsetloadfalse)
//       );
//     } catch (error) {
//       console.log(error.message);
//     }
//   } else {
//     Alert.alert('Post in progress');
//   }
// };
