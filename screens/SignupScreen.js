import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import SignupForm from '../components/signupScreen/SignupForm';

import IG_LOGO from '../assets/instagram-logo.png';

const instagramLogo = Image.resolveAssetSource(IG_LOGO).uri;

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: instagramLogo, height: 100, width: 100 }} />
      </View>
      <SignupForm navigation={navigation} />
    </View>
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
