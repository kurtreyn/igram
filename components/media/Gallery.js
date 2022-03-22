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
import { firebase, storage } from '../../firebase';
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import BACK_ARROW_ICON from '../../assets/icon-back-arrow.png';
const backArrowIcon = Image.resolveAssetSource(BACK_ARROW_ICON).uri;

export default function Gallery() {
  const [image, setImage] = useState(null);
  const storage = firebase.storage();
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  console.log(`image is: ${image}`);

  const postImage = async () => {
    try {
      const file = image;
      const storageRef = firebase.app().storage().ref();
      const fileRef = storageRef.child(JSON.stringify(image));
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
      Alert.alert('Post successful');
    } catch (error) {
      console.log(error);
    }
  };

  // function postImage(file) {
  //   const ref = firebase.storage().ref().child(image);

  //   try {
  //     ref.put(file).then((snapshot) => {
  //       console.log(snapshot);
  //       console.log('Uploaded a blob or file!');
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.message);
  //   }
  // }

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
            <Pressable style={styles.button} onPress={postImage}>
              <Text style={styles.text}>Post</Text>
            </Pressable>
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
