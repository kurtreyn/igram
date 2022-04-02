import React from 'react';
import { firebase, db } from '../firebase';
import 'firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  setImageUrl,
  setLoading,
  setCaption,
  setProgress,
} from '../redux/actions/indexActions';

export const user = firebase.auth().currentUser;
export const uuid = uuidv4();

// const mapStateToProps = (state) => {
//   return {
//     imageUrl: state.imageUrl,
//     loading: state.loading,
//     progress: state.progress,
//     caption: state.caption,
//   };
// };

// const mapDispatchToProps = {
//   setImageUrl: (imageUrl) => setImageUrl(imageUrl),
//   setLoading: (loading) => setLoading(loading),
//   setCaption: (caption) => setCaption(caption),
//   setProgress: (progress) => setProgress(progress),
// };

export const saveImage = async (uri) => {
  dispatch(setLoading(true));
  console.log(loading);
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
        setProgress(snapshot.bytesTransferred / snapshot.totalBytes);
        console.log('Upload is ' + progress + '% done');

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
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(`downloadURL is: ${downloadURL}`);
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
      })

      .then(() => navigation.push('HomeScreen'));
    return unsubscribe;
  } catch (error) {
    Alert.alert(error.message);
  }
  dispatch(setLoading(false));
};

export const handlePost = async function () {
  if (!loading) {
    try {
      const response = await saveImage(imageUrl);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    Alert.alert('Post in progress');
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(sharedFunctions);
