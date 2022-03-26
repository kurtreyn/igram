import React, { useState, useEffect } from 'react';
import { firebase, db, storage } from '../firebase';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export function updateProfilePicture() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [caption, setCaption] = useState('');

  const user = firebase.auth().currentUser;
  const uuid = uuidv4();

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

  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection('users')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );
    return unsubscribe;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      // console.log(`result uri: ${result.uri}`);
      // setImageUrl(result.uri);
      saveImage(result.uri);
    }
  };

  // console.log(`imageUrl is: ${imageUrl}`);

  const saveImage = async (uri) => {
    let filename = uri.substring(uri.lastIndexOf('/') + 1);
    setLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref()
        .child('profilePic/' + filename);
      ref.put(blob);

      setLoading(false);
      // Alert.alert('1 saveImage finished successfully');
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
    setImageUrl(uri);
    // fetchDownloadUrl(filename)
    setFileName(filename);
  };

  const fetchDownloadUrl = async (fileN) => {
    try {
      storage
        .ref('profilePic/' + fileN)
        .getDownloadURL()
        .then((url) => {
          updateProfilePic(url + fileN);
          postImage(url);
          // Alert.alert('2 fetchDownloadUrl completed');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfilePic = async (pic) => {
    user
      .updateProfile({
        photoURL: pic,
      })
      .then(() => {
        console.log('update successful');
        console.log(`-----NEW photoURL: ${user.photoURL}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const postImage = async (img) => {
    try {
      const unsubscribe = db
        .collection('users')
        .doc(firebase.auth().currentUser.email)
        .collection('posts')
        .add({
          imageUrl: null,
          user: currentLoggedInUser.username,
          profile_picture: img,
          owner_uid: firebase.auth().currentUser.uid,
          owner_email: firebase.auth().currentUser.email,
          caption: caption,
          likes_by_users: [],
          comments: [],
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        // .then(() => Alert.alert('3 postImage function success'))
        .then(() => navigation.push('HomeScreen'));
      return unsubscribe;
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handlePost = async function () {
    // console.log(`fileName is: ${fileName}`);
    // Alert.alert(`fileName is: ${fileName}`);
    try {
      const response = await fetchDownloadUrl(fileName);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
}
