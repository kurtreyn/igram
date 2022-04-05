import React from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BACK_ARROW_ICON from '../../assets/icon-back-arrow.png';
const backArrowIcon = Image.resolveAssetSource(BACK_ARROW_ICON).uri;

import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import { Divider } from 'react-native-elements';
import camera_icon from '../../assets/camera-icon.png';
import rotate_icon from '../../assets/rotate-icon.png';
const cameraIcon = Image.resolveAssetSource(camera_icon).uri;
const rotateIcon = Image.resolveAssetSource(rotate_icon).uri;

const CameraView = ({
  loading,
  imageUrl,
  takePicture,
  setType,
  type,
  setCamera,
  handleView,
  caption,
  dispatch,
  handlePost,
  setCaption,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={handleView}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{
                  uri: backArrowIcon,
                }}
                style={{ width: 30, height: 30, marginTop: 10 }}
              />
              <Text style={{ color: '#FFF', marginTop: 15 }}>Back</Text>
            </View>
          </TouchableOpacity>
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
};

export default CameraView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 100,
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
