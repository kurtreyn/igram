import { SET_POSTS } from './actions';

const initialState = {
  posts: [],
};

export const setPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload };

    default:
      return state;
  }
};
