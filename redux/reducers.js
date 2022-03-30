import { SET_POSTS } from './actions';
import { SET_IMAGEURL } from './actions';

const initialState = {
  posts: [],
  imageUrl: null,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export const imageUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGEURL:
      return { ...state, imageUrl: action.payload };
    default:
      return state;
  }
};
