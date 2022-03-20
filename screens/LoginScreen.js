import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import LoginForm from '../components/loginScreen/LoginForm';

// import IG_LOGO from '../assets/instagram-logo.png';

// const instagramLogo = Image.resolveAssetSource(IG_LOGO).uri;

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image source={{ uri: instagramLogo, height: 100, width: 100 }} /> */}
      </View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

export default LoginScreen;

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
