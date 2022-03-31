import { SET_CURRENT_LOGGED_IN_USER } from '../constants/indexConstants';

const initialState = {
  username: null,
  profilePicture: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_LOGGED_IN_USER:
      return { ...state, currentLoggedInUser: action.currentLoggedInUser };
    default:
      return state;
  }
};

export default userReducer;
