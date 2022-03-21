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

  useEffect(() => {
    getUserName();
  }, []);

  const uploadPostToFirebase = (image) => {
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts')
      .add({
        imageUrl: image,
        user: firebase.auth().username,
        profile_picture: firebase.auth().photoURL,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());
    return unsubscribe;
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
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatioTag}
          type={type}
          ratio={'1:1'}
        />
      </View>

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
