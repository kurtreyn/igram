import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import postsReducer from './postsReducer';
import imageUrlReducer from './imageUrlReducer.js';
import Reducer from './reducer.js';

const rootReducer = combineReducers({
  userReducer,
  postsReducer,
  imageUrlReducer,
  Reducer,
});

export default rootReducer;
