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
import 'firebase/storage';
import { Divider } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import BACK_ARROW_ICON from '../../assets/icon-back-arrow.png';
const backArrowIcon = Image.resolveAssetSource(BACK_ARROW_ICON).uri;

export default function Gallery({ navigation }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [caption, setCaption] = useState('');
  // const user = firebase.auth().currentUser;

  // console.log(currentLoggedInUser);
  // console.log(caption);

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
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
              <Divider width={1} orientation="vertical" />
              <TextInput
                style={{ color: 'white', fontSize: 20, marginTop: 20 }}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChange={(e) => setCaption(e.nativeEvent.text)}
              />
              <Divider width={1} orientation="vertical" />
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
