import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
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
  // POSTS IS AN OBJECT: USING REDUX
  const posts = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();
  const postsMap = posts.posts;

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

  console.log(postsMap);

  // POSTS IS AN OBJECT: NOT USING REDUX
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collectionGroup('posts')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot((snapshot) => {
  //       setPosts(
  //         snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
  //       );
  //     });
  //   return unsubscribe;
  // }, []);

  // console.log(posts);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {postsMap.map((post, index) => (
          <Post post={post} key={index} />
        ))}
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
