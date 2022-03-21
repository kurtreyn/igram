import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const PostImage = ({ post }) => {
  return (
    <View style={styles.postImageContainer} key={post.id}>
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
    </View>
  );
};

export default PostImage;

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#FF8501',
  },
  textStyle: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '500',
  },
  elipsesText: {
    color: 'white',
    fontWeight: '900',
  },
  postImageContainer: {
    width: '100%',
    height: 450,
  },
  postImage: {
    height: '100%',
    resizeMode: 'cover',
  },
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
  likesStyle: {
    color: 'white',
    fontWeight: '600',
  },
  likesContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  camptionText: {
    color: 'white',
  },
});
