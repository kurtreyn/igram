import { firebase, db } from '../../firebase';
import {
  SET_POSTS,
  IMAGE_URL,
  SET_CURRENT_LOGGED_IN_USER,
  SET_LOADING,
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

export const setLoading = (loading) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });
};

const getUserName = () => {
  const unsubscribe = db
    .collection('users')
    .where('owner_uid', '==', user.uid)
    .limit(1)
    .onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        currentLoggedInUser = {
          username: doc.data().username,
          profilePicture: doc.data().profile_picture,
        };
      })
    );
  console.log(currentLoggedInUser);
  return unsubscribe;
};

export const setCurrentLoggedInUser = (currentLoggedInUser) => (dispatch) => {
  getUserName();
  dispatch({
    type: SET_CURRENT_LOGGED_IN_USER,
    payload: currentLoggedInUser,
  });
};

// export const getUserName = () => {
//   return (dispatch) => {
//     db.collection('users')
//       .doc(firebase.auth().currentUser.uid)
//       .get()
//       .then((snapshot) => {
//         if (snapshot.exists) {
//           dispatch({
//             type: SET_CURRENT_LOGGED_IN_USER,
//             payload: {
//               username: doc.data().username,
//               profilePicture: doc.data().profile_picture,
//             },
//           });
//         } else {
//           console.log('does not exist');
//         }
//       });
//   };
// };

// export const getUserName = () => {
//   return (dispatch) => {
//     firebase
//       .firestore()
//       .collection('users')
//       .doc(firebase.auth().currentUser.uid)
//       .get()
//       .then((snapshot) => {
//         if (snapshot.exists) {
//           dispatch({
//             type: SET_CURRENT_LOGGED_IN_USER,
//             payload: {
//               username: doc.data().username,
//               profilePicture: doc.data().profile_picture,
//             },
//           });
//         } else {
//           console.log('does not exist');
//         }
//       });
//   };
// };

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
