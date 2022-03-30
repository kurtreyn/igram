import { USER_STATE_CHANGE } from '../constants/indexConstants';
import { SET_POSTS, IMAGE_URL } from '../constants/indexConstants';

// import { firebase, db } from '../../firebase';

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

// export const fetchUser = () => {
//   return (dispatch) => {
//     firebase
//       .firestore()
//       .collection('users')
//       .doc(firebase.auth().currentUser.uid)
//       .get()
//       .then((snapshot) => {
//         if (snapshot.exists) {
//           dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
//         } else {
//           console.log('User does not exist');
//         }
//       });
//   };
// };
