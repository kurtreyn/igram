import { USER_STATE_CHANGE } from '../constants/indexConstants';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return { ...state, currentUser: action.currentUser };
    default:
      return state;
  }
};
// const initialState = {
//   currentUser: null,
// };

// const userReducer = (state = initialState, action) => {
//   return {
//     ...state,
//     currentUser: action.currentUser,
//   };
// };

export default userReducer;
