import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../redux/actions/indexActions';
import Header from '../components/home/Header';
import Post from '../components/posts/Post';
import Stories from '../components/home/Stories';
import BottomTabs from '../shared/BottomTabs';
import { bottomTabIcons } from '../shared/bottomTabIcons';

const HomeScreen = ({ navigation }) => {
  const { posts } = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();
  // console.log(posts);

  useEffect(() => {
    const unsubscribe = db
      .collectionGroup('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        dispatch(
          setPosts(
            snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
          )
        );
      });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts ? (
          posts.map((post, index) => <Post post={post} key={index} />)
        ) : (
          <Text style={{ color: '#FFF' }}>Loading...</Text>
        )}
      </ScrollView>
      <BottomTabs
        icons={bottomTabIcons}
        posts={posts}
        navigation={navigation}
      />
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
