import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/home/Header';
import Posts from '../components/posts/Posts';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [userPic, setUserPic] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      {/* <Stories /> */}
      <ScrollView>
        <Posts />
        {/* {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))} */}
      </ScrollView>
      {/* <BottomTabs icons={bottomTabIcons} posts={posts} /> */}
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
