import * as ActionTypes from './ActionTypes';
import { firebase } from '../firebase';
const user = firebase.auth().currentUser;

// ACTIONS EXAMPLE
export const depositMoney = (amount) => {
  return (dispatch) => {
    dispatch({
      type: 'deposit',
      payload: amount,
    });
  };
};
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

// REDUCERS EXAMPLE
export const reducer = (state = 0, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'deposit':
      return state + action.payload;
    case 'withdraw':
      return state - action.payload;
    default:
      return state;
  }
};
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
