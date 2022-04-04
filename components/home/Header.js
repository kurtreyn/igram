import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { firebase } from '../../firebase';
import PLUS_ICON from '../../assets/icon-plus-2-math.png';
import HEART_ICON from '../../assets/icons8-heart-50.png';
import MESSANGER_ICON from '../../assets/icon-facebook-messenger.png';

const plusIcon = Image.resolveAssetSource(PLUS_ICON).uri;
const heartIcon = Image.resolveAssetSource(HEART_ICON).uri;
const messangerIcon = Image.resolveAssetSource(MESSANGER_ICON).uri;

const Header = ({ navigation }) => {
  const handleSignout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('Signed out successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          Alert.alert('What would you like to do?', '--', [
            {
              text: 'Sign Out',
              onPress: () => handleSignout(),
            },
            {
              text: 'Cancel',
              onPress: () => navigation.push('HomeScreen'),
            },
          ])
        }
      >
        <Image
          style={styles.logo}
          source={require('../../assets/header-logo.png')}
        />
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Options', '--', [
              {
                text: 'Take A Picture',
                onPress: () => navigation.push('CameraComponent'),
              },
              {
                text: 'Upload Picture from Gallery',
                onPress: () => navigation.push('GalleryCameraContainer'),
              },
            ])
          }
        >
          <Image
            source={{
              uri: plusIcon,
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{
              uri: heartIcon,
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>2</Text>
          </View>
          <Image
            source={{
              uri: messangerIcon,
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
  },
});
