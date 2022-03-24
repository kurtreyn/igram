import React from 'react';
import { StyleSheet, View } from 'react-native';
import { firebase, db } from '../../firebase';
import { Divider } from 'react-native-elements';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import Likes from './Likes';
import Caption from './Caption';
import CommentsSection from './CommentsSection';
import Comments from './Comments';
import { postFooterIcons } from '../../shared/postFooterIcons';

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );
    db.collection('users')
      .doc(post.owner_email)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log('Document successfully updated');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={styles.postFooterContainer}>
        <PostFooter
          post={post}
          postFooterIcons={postFooterIcons}
          handleLike={handleLike}
        />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

export default Post;

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
