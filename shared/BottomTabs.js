import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { firebase, db } from '../firebase';
import PROFILE_AVATAR from '../assets/profile-avatar.png';
const profileAvatar = Image.resolveAssetSource(PROFILE_AVATAR).uri;

const BottomTabs = ({ icons, navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [profilePic, setProfilePic] = useState(profileAvatar);
  const user = firebase.auth().currentUser;

  function changeProfilePic() {
    setProfilePic(user.photoURL);
  }

  useEffect(() => {
    changeProfilePic();
  }, []);

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === 'Profile' ? styles.profilePic() : null,
          activeTab === 'Profile' && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  const ProfileIcon = () => (
    <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
      <Image source={{ uri: profilePic }} style={styles.profilePicIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
        <ProfileIcon />
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    bottom: '3%',
    zIndex: 4,
    backgroundColor: '#000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = '') => ({
    borderRadius: 50,
    borderWidth: activeTab === 'Profile' ? 2 : 0,
    borderColor: '#FFF',
  }),
  profilePicIcon: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFF',
    width: 30,
    height: 30,
  },
});
