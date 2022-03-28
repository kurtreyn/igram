import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import SignupForm from '../components/signupScreen/SignupForm';

import IG_LOGO from '../assets/instagram-logo.png';

const instagramLogo = Image.resolveAssetSource(IG_LOGO).uri;

const SignupScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={styles.logoContainer}>
            <Image source={{ uri: instagramLogo, height: 100, width: 100 }} />
          </View>
          <SignupForm navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
});
