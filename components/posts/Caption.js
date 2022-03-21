import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      <Text style={styles.captionText}>
        <Text style={{ fontWeight: '600' }}>{post.user}</Text>
        <Text> {post.caption}</Text>
      </Text>
    </View>
  );
};

export default Caption;

const styles = StyleSheet.create({
  captionText: {
    color: 'white',
  },
});
