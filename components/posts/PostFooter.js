import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { firebase } from '../../firebase';
import Icon from './Icon';

const PostFooter = ({ post, postFooterIcons, handleLike }) => {
  return (
    <View style={styles.postFooter}>
      <View style={styles.leftFooterIconsContainer}>
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            style={styles.footerIcon}
            source={{
              uri: post.likes_by_users.includes(
                firebase.auth().currentUser.email
              )
                ? postFooterIcons[0].likedImageUrl
                : postFooterIcons[0].imageUrl,
            }}
          />
        </TouchableOpacity>

        <Icon
          imgStyle={styles.footerIcon}
          imageUrl={postFooterIcons[1].imageUrl}
        />
        <Icon
          imgStyle={styles.footerIcon}
          imageUrl={postFooterIcons[2].imageUrl}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Icon
          imgStyle={styles.footerIcon}
          imageUrl={postFooterIcons[3].imageUrl}
        />
      </View>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  footerIcon: {
    width: 33,
    height: 33,
  },
  postFooterContainer: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  postFooter: {
    flexDirection: 'row',
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
});
