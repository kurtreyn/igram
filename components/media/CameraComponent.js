import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import { firebase, db } from '../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';

import camera_icon from '../../assets/camera-icon.png';
import rotate_icon from '../../assets/rotate-icon.png';
const cameraIcon = Image.resolveAssetSource(camera_icon).uri;
const rotateIcon = Image.resolveAssetSource(rotate_icon).uri;

export default function CameraComponent() {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  // const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      //   console.log(data.uri);
    }
  };

  const saveImage = async (uri) => {
    let filename = uri.substring(uri.lastIndexOf('/') + 1);
    setLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref()
        .child('images/' + filename);
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
        .ref('images/' + fileN)
        .getDownloadURL()
        .then((url) => {
          postImage(url + fileN, caption);
          // Alert.alert('2 fetchDownloadUrl completed');
        });
    } catch (error) {
      console.log(error);
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
          user: currentLoggedInUser.username,
          profile_picture: currentLoggedInUser.profilePicture,
          owner_uid: firebase.auth().currentUser.uid,
          owner_email: firebase.auth().currentUser.email,
          caption: caption,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          likes_by_users: [],
          comments: [],
        })
        // .then(() => Alert.alert('3 postImage function success'))
        .then(() => navigation.goBack());
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

  useEffect(() => {
    getUserName();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {image ? null : (
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatioTag}
            type={type}
            ratio={'1:1'}
          />
        </View>
      )}

      {image && (
        <View>
          <Image
            source={{ uri: image }}
            style={{ flex: 1, position: 'absolute' }}
          />
          <Button title="Upload Image" onPress={() => uploadPostToFirebase()} />
        </View>
      )}

      <TouchableOpacity
        style={styles.rotateIconContainer}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        <Image source={{ uri: rotateIcon }} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cameraIconContainer}
        onPress={() => takePicture()}
      >
        <Image source={{ uri: cameraIcon }} style={{ width: 60, height: 60 }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatioTag: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraIconContainer: {
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '18%',
    borderRadius: 50,
  },
  rotateIconContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
  },
});
