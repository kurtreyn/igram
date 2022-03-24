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
import * as ImagePicker from 'expo-image-picker';
import BACK_ARROW_ICON from '../../assets/icon-back-arrow.png';
const backArrowIcon = Image.resolveAssetSource(BACK_ARROW_ICON).uri;

export default function Gallery({ navigation }) {
  const [image, setImage] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [caption, setCaption] = useState('');
  // const user = firebase.auth().currentUser;

  // console.log(currentLoggedInUser);
  console.log(caption);

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
      setImage(result.uri);
      setImageUrl(result.uri);
    }
  };

  const postImage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    setLoading(true);
    try {
      await storage.ref(filename).put(uploadUri);
      storage
        .ref(filename)
        .getDownloadURL()
        .then((url) => {
          uploadPostToFirebase(url, caption);
        });

      Alert.alert('Post was successful');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  console.log(`fileUrl: ${fileUrl}`);

  const uploadPostToFirebase = (img, caption) => {
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
      .then(() => navigation.goBack());
    return unsubscribe;
  };

  return (
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

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.bodyContainer}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <View>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
              <TextInput
                style={{ color: 'white', fontSize: 20 }}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChange={(e) => setCaption(e.nativeEvent.text)}
              />
              <TouchableOpacity style={styles.button} onPress={postImage}>
                <Text style={styles.text}>Post</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
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
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    marginTop: 200,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
