import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import postsReducer from './postsReducer';
import imageUrlReducer from './imageUrlReducer.js';

const rootReducer = combineReducers({
  userReducer,
  postsReducer,
  imageUrlReducer,
});

export default rootReducer;
