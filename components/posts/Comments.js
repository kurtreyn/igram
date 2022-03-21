import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Comments = ({ post }) => {
  return (
    <>
      {post.comments.map((comment, index) => (
        <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: '600' }}>{comment.user}</Text>{' '}
            {comment.comment}
          </Text>
        </View>
      ))}
    </>
  );
};

export default Comments;
