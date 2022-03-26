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
} from 'react-native';
import { firebase, db, storage } from '../../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import { Divider } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import camera_icon from '../../assets/camera-icon.png';
import rotate_icon from '../../assets/rotate-icon.png';
const cameraIcon = Image.resolveAssetSource(camera_icon).uri;
const rotateIcon = Image.resolveAssetSource(rotate_icon).uri;

export default function CameraComponent({ navigation }) {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const user = firebase.auth().currentUser;
  const uuid = uuidv4();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
    }
  });

  const getUserName = () => {
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

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImageUrl(data.uri);
    }
  };

  const saveImage = async (uri) => {
    setLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      let filename = `${uuid}.png`;
      // let filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = firebase
        .storage()
        .ref()
        .child('postImages/' + filename);

      const uploadTask = storageRef.put(blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          user: currentLoggedInUser.username,
          profile_picture: user.photoURL,
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
    setLoading(false);
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

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        {imageUrl ? null : (
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatioTag}
              type={type}
              ratio={'1:1'}
            />
          </View>
        )}

        {imageUrl && (
          <View>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Image
                source={{ uri: imageUrl }}
                style={{
                  width: 300,
                  height: 300,
                }}
              />
            </View>
            <Divider width={1} orientation="vertical" />
            <TextInput
              style={{ color: 'white', fontSize: 20, marginTop: 20 }}
              placeholder="Add caption to post"
              placeholderTextColor="gray"
              multiline={true}
              onChange={(e) => setCaption(e.nativeEvent.text)}
            />
            <Divider width={1} orientation="vertical" />
            {caption.length < 1 ? null : (
              <TouchableOpacity
                style={styles.button}
                onPress={handlePost}
                disabled={loading}
              >
                <Text style={styles.text}>Post</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {imageUrl ? null : (
          <>
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
              <Image
                source={{ uri: rotateIcon }}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={() => takePicture()}
            >
              <Image
                source={{ uri: cameraIcon }}
                style={{ width: 60, height: 60 }}
              />
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
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
    borderColor: '#FFF',
    borderRadius: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#405DE6',
    marginTop: 100,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
