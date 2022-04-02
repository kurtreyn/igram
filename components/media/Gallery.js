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
// import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import {
  setImageUrl,
  setLoading,
  setCaption,
  setProgress,
} from '../../redux/actions/indexActions';
import {
  user,
  uuid,
  saveImage,
  postImage,
  handlePost,
} from '../../shared/sharedFunctions';
import BACK_ARROW_ICON from '../../assets/icon-back-arrow.png';
const backArrowIcon = Image.resolveAssetSource(BACK_ARROW_ICON).uri;

export default function Gallery({ navigation }) {
  // const [caption, setCaption] = useState('');
  // const [progress, setProgress] = useState(null);
  // const uuid = uuidv4();
  // const user = firebase.auth().currentUser;

  const { imageUrl } = useSelector((state) => state.Reducer);
  const { loading } = useSelector((state) => state.Reducer);
  const { progress } = useSelector((state) => state.Reducer);
  const { caption } = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();
  console.log('loading:', loading);
  console.log('progress:', progress);
  console.log('caption', caption);

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

  // const saveImage = async (uri) => {
  //   dispatch(setLoading(true));
  //   console.log(loading);
  //   try {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
  //     let filename = `${uuid}.png`;

  //     const storageRef = firebase
  //       .storage()
  //       .ref()
  //       .child('postImages/' + filename);

  //     const uploadTask = storageRef.put(blob);

  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         setProgress(snapshot.bytesTransferred / snapshot.totalBytes);
  //         console.log('Upload is ' + progress + '% done');

  //         switch (snapshot.state) {
  //           case firebase.storage.TaskState.PAUSED:
  //             console.log('Upload is paused');
  //             break;
  //           case firebase.storage.TaskState.RUNNING:
  //             console.log('Upload is running');
  //             break;
  //         }
  //       },
  //       (error) => {
  //         Alert.alert(error.message);
  //       },
  //       () => {
  //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //           console.log(`downloadURL is: ${downloadURL}`);
  //           postImage(downloadURL, caption);
  //         });
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert(error.message);
  //   }
  // };

  // const postImage = async (img, caption) => {
  //   try {
  //     const unsubscribe = db
  //       .collection('users')
  //       .doc(firebase.auth().currentUser.email)
  //       .collection('posts')
  //       .add({
  //         imageUrl: img,
  //         user: user.displayName,
  //         profile_picture: user.photoURL,
  //         owner_uid: firebase.auth().currentUser.uid,
  //         owner_email: firebase.auth().currentUser.email,
  //         caption: caption,
  //         likes_by_users: [],
  //         comments: [],
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       })

  //       .then(() => navigation.push('HomeScreen'));
  //     return unsubscribe;
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  //   dispatch(setLoading(false));
  // };

  // const handlePost = async function () {
  //   if (!loading) {
  //     try {
  //       const response = await saveImage(imageUrl);
  //       return response;
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   } else {
  //     Alert.alert('Post in progress');
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{
                    uri: backArrowIcon,
                  }}
                  style={{ width: 30, height: 30, marginTop: 30 }}
                />
                <Text style={{ color: '#FFF', marginTop: 35 }}>Back</Text>
              </View>
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
                  placeholder="Add caption to post"
                  placeholderTextColor="gray"
                  returnKeyLabel="Done"
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  multiline={true}
                  onChange={(e) => dispatch(setCaption(e.nativeEvent.text))}
                />
                <Divider width={1} orientation="vertical" />
                {!loading ? (
                  <View>
                    {caption.length === 0 ? null : (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handlePost}
                        disabled={loading}
                      >
                        <Text style={styles.text}>Post</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <Text style={{ color: '#FFF' }}>
                    Please wait while your photo posts
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

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
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
});
