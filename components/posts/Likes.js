import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Likes = ({ post }) => {
  return (
    <View style={styles.likesContainer}>
      <Text style={styles.likesStyle}>
        {post.likes_by_users.length.toLocaleString('en')} likes
      </Text>
    </View>
  );
};

export default Likes;

const styles = StyleSheet.create({
  likesContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  likesStyle: {
    color: 'white',
    fontWeight: '600',
  },
});
