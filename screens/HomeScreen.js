import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/home/Header';
import Post from '../components/posts/Post';
import Stories from '../components/home/Stories';
import BottomTabs from '../shared/BottomTabs';
import { bottomTabIcons } from '../shared/bottomTabIcons';
import { TEMP_POSTS } from '../temp/tempPosts';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   db.collectionGroup('posts').onSnapshot((snapshot) => {
  //     setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
  //   });
  // }, []);

  // console.log(bottomTabIcons);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {TEMP_POSTS.map((post, index) => {
          <Post post={post} index={index} />;
        })}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} posts={posts} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
