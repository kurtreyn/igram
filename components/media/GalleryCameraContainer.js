import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { firebase, db } from '../../firebase';
import 'firebase/storage';
import { Divider } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import {
  setImageUrl,
  setLoading,
  setCaption,
  setProgress,
} from '../../redux/actions/indexActions';
import { user, uuid } from '../../shared/sharedFunctions';
import Gallery from './Gallery';
import CameraComponent from './CameraComponent';

export default function GalleryCameraContainer({ navigation }) {
  const { imageUrl } = useSelector((state) => state.Reducer);
  const { loading } = useSelector((state) => state.Reducer);
  const { progress } = useSelector((state) => state.Reducer);
  const { caption } = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();

  console.log('loading:', loading);
  console.log('progress:', progress);
  console.log('caption', caption);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     dispatch(setImageUrl(result.uri));
  //   }
  // };

  const saveImage = async (uri) => {
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

  const postImage = async (img, caption) => {
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

  const handlePost = async function () {
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

  return (
    <>
      <Gallery
        // imageUrl={imageUrl}
        loading={loading}
        progress={progress}
        // caption={caption}
        user={user}
        uuid={uuid}
        saveImage={saveImage}
        postImage={postImage}
        handlePost={handlePost}
        // dispatch={dispatch}
      />
      <CameraComponent
        imageUrl={imageUrl}
        loading={loading}
        progress={progress}
        caption={caption}
        user={user}
        uuid={uuid}
        saveImage={saveImage}
        postImage={postImage}
        handlePost={handlePost}
        dispatch={dispatch}
      />
    </>
  );
}
