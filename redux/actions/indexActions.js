import { firebase, db } from '../../firebase';
import {
  SET_POSTS,
  IMAGE_URL,
  SET_CURRENT_LOGGED_IN_USER,
} from '../constants/indexConstants';
export const user = firebase.auth().currentUser;
// console.log(user);

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

export const getUserName = (dispatch) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: USER_STATE_CHANGE,
            payload: {
              username: doc.data().username,
              profilePicture: doc.data().profile_picture,
            },
          });
        } else {
          console.log('does not exist');
        }
      });
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
