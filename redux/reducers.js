import { SET_POSTS } from './actions';
import { SET_IMAGEURL } from './actions';
import { GET_CURRENT_USER } from './actions';

const initialState = {
  currentUser: null,
  posts: [],
  imageUrl: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
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
