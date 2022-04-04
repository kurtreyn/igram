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
// import { firebase, db } from '../../firebase';
import 'firebase/storage';
import { Divider } from 'react-native-elements';
// import { Camera } from 'expo-camera';
// import * as ImagePicker from 'expo-image-picker';
// import { useSelector, useDispatch } from 'react-redux';
// import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';
import {
  setImageUrl,
  setLoading,
  setCaption,
  setProgress,
  setView,
} from '../../redux/actions/indexActions';
import BACK_ARROW_ICON from '../../assets/icon-back-arrow.png';
import CAMERA_ICON from '../../assets/icons-camera-white.png';
const cameraIcon = Image.resolveAssetSource(CAMERA_ICON).uri;
const backArrowIcon = Image.resolveAssetSource(BACK_ARROW_ICON).uri;

const GalleryView = ({
  navigation,
  loading,
  imageUrl,
  pickImage,
  caption,
  dispatch,
  handlePost,
  handleView,
  user,
  progress,
  view,
}) => {
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
              <View style={styles.toggleContainer}>
                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                />
                <Text style={{ color: '#FFF', marginLeft: 120, marginTop: 20 }}>
                  Or switch to Camera
                </Text>
                <TouchableOpacity onPress={handleView}>
                  <Image
                    source={{ uri: cameraIcon }}
                    style={{
                      height: 50,
                      width: 50,
                      marginLeft: 150,
                      marginTop: 20,
                    }}
                  />
                </TouchableOpacity>
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
};

export default GalleryView;

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
  toggleContainer: {
    flex: 1,
    marginTop: 200,
    justifyContent: 'flex-start',
    padding: 5,
  },
});
