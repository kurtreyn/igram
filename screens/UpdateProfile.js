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
import { firebase, db, storage } from '../firebase';
import 'firebase/storage';
import { Divider } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import BACK_ARROW_ICON from '../assets/icon-back-arrow.png';
const backArrowIcon = Image.resolveAssetSource(BACK_ARROW_ICON).uri;

export default function UpdateProfile({ navigation }) {
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

  useEffect(() => {
    getUserName();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  const saveImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      let filename = `${uuid}.png`;
      // let filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = firebase
        .storage()
        .ref()
        .child('profilePic/' + filename);

      const uploadTask = storageRef.put(blob);

      setLoading(true);

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
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              console.log(`downloadURL is: ${downloadURL}`);
              user.updateProfile({ photoURL: downloadURL });
            })
            .then(() => navigation.navigate('HomeScreen'));
        }
      );

      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  const handlePost = async function () {
    try {
      const response = await saveImage(imageUrl);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={{
                uri: backArrowIcon,
              }}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bodyContainer}>
          {!imageUrl && (
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
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

              <TouchableOpacity style={styles.button} onPress={handlePost}>
                <Text style={styles.text}>Post</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// { flex: 1, alignItems: 'center', justifyContent: 'center' }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    marginHorizontal: 10,
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    marginTop: 50,
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
