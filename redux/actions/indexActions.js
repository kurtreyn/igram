import { firebase, db } from '../../firebase';
import {
  SET_POSTS,
  IMAGE_URL,
  SET_CAPTION,
  SET_LOADING,
  SET_PROGRESS,
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

export const setCaption = (caption) => (dispatch) => {
  dispatch({
    type: SET_CAPTION,
    payload: caption,
  });
};

export const setProgress = (progress) => (dispatch) => {
  dispatch({
    type: SET_PROGRESS,
    payload: progress,
  });
};

// export const fetchPosts = () => {
//   return (dispatch) => {
//     db.collectionGroup('posts')
//       .orderBy('timestamp', 'desc')
//       .onSnapshot((snapshot) => {
//         dispatch({
//           type: SET_POSTS,
//           payload: snapshot.docs.map((post) => ({
//             id: post.id,
//             ...post.data(),
//           })),
//         });
//       });
//   };
// };
