import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  Pressable,
} from 'react-native';
import { firebase, db, storage } from '../../firebase';
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import BACK_ARROW_ICON from '../../assets/icon-back-arrow.png';
const backArrowIcon = Image.resolveAssetSource(BACK_ARROW_ICON).uri;

export default function Gallery({ navigation }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const user = firebase.auth().currentUser;

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
          setFileUrl(url);
        });
      Alert.alert('Post was successful');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
    uploadPostToFirebase(fileUrl, caption);
  };

  // console.log(`fileUrl: ${fileUrl}`);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts')
      .add({
        imageUrl: imageUrl,
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

      <View style={styles.bodyContainer}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <View>
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
            <TouchableOpacity style={styles.button} onPress={postImage}>
              <Text style={styles.text}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
