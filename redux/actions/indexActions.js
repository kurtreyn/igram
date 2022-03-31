import { db } from '../../firebase';
import {
  SET_POSTS,
  IMAGE_URL,
  SET_CURRENT_LOGGED_IN_USER,
} from '../constants/indexConstants';

export const setPosts = (posts) => (dispatch) => {
  dispatch({
    type: SET_POSTS,
    payload: posts,
  });
};

export const setImageUrl = (imageUrl) => (dispatch) => {
  dispatch({
    type: IMAGE_URL,
    payload: imageUrl,
  });
};

export const getUserName = () => {
  return (dispatch) => {
    db.collection('users')
      .where('owner_uid', '==', user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          dispatch({
            type: SET_CURRENT_LOGGED_IN_USER,
            payload: {
              username: doc.data().username,
              profilePicture: doc.data().profile_picture,
            },
          });
        })
      );
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    db.collectionGroup('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        dispatch({
          type: SET_POSTS,
          payload: snapshot.docs.map((post) => ({
            id: post.id,
            ...post.data(),
          })),
        });
      });
  };
};
