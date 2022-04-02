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
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
// import { user } from '../../shared/sharedFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import { Divider } from 'react-native-elements';

import camera_icon from '../../assets/camera-icon.png';
import rotate_icon from '../../assets/rotate-icon.png';
const cameraIcon = Image.resolveAssetSource(camera_icon).uri;
const rotateIcon = Image.resolveAssetSource(rotate_icon).uri;

export default function CameraComponent({
  navigation,
  imageUrl,
  loading,
  progress,
  caption,
  user,
  uuid,
  saveImage,
  postImage,
  handlePost,
  dispatch,
}) {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImageUrl(data.uri);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
                returnKeyLabel="Done"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                multiline={true}
                onChange={(e) => setCaption(e.nativeEvent.text)}
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
    </KeyboardAvoidingView>
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
