import React, { useState, useEffect } from 'react';
import { Image, View, Alert, Text } from 'react-native';
import { firebase, db } from '../../firebase';
import 'firebase/storage';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
  setImageUrl,
  setLoading,
  // setCaption,
  setProgress,
  setView,
} from '../../redux/actions/indexActions';
import GalleryView from './GalleryView';
import CameraView from './CameraView';

const GalleryCameraContainer = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const { imageUrl } = useSelector((state) => state.Reducer);
  const { loading } = useSelector((state) => state.Reducer);
  const { progress } = useSelector((state) => state.Reducer);
  const { caption } = useSelector((state) => state.Reducer);
  const { view } = useSelector((state) => state.Reducer);
  const user = firebase.auth().currentUser;
  const uuid = uuidv4();
  const dispatch = useDispatch();

  // console.log('loading:', loading);
  // console.log('progress:', progress);
  // console.log('caption', caption);
  // console.log('view', view);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      dispatch(setImageUrl(data.uri));
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      dispatch(setImageUrl(result.uri));
    }
  };

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
          dispatch(
            setProgress(snapshot.bytesTransferred / snapshot.totalBytes)
          );
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
    dispatch(setImageUrl(null));
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

  const handleView = () => {
    dispatch(setView(!view));
  };

  return (
    <>
      {view && (
        <GalleryView
          imageUrl={imageUrl}
          loading={loading}
          progress={progress}
          caption={caption}
          user={user}
          uuid={uuid}
          pickImage={pickImage}
          saveImage={saveImage}
          postImage={postImage}
          handlePost={handlePost}
          setProgress={setProgress}
          dispatch={dispatch}
          view={view}
          handleView={handleView}
          navigation={navigation}
        />
      )}
      {!view && (
        <CameraView
          imageUrl={imageUrl}
          loading={loading}
          progress={progress}
          caption={caption}
          user={user}
          uuid={uuid}
          hasCameraPermission={hasCameraPermission}
          setHasCameraPermission={setHasCameraPermission}
          type={type}
          setType={setType}
          camera={camera}
          setCamera={setCamera}
          saveImage={saveImage}
          postImage={postImage}
          handlePost={handlePost}
          dispatch={dispatch}
          takePicture={takePicture}
          view={view}
          handleView={handleView}
        />
      )}
    </>
  );
};

export default GalleryCameraContainer;
