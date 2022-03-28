import { createStore, combineReducers } from 'redux';
import { imageUrlReducer } from './actions';
const rootReducer = combineReducers({ image: imageUrlReducer });
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
