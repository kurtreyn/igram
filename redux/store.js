import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postsReducer, setImageUrlReducer } from './reducers';

// const rootReducer = combineReducers({ post: postsReducer });
const rootReducer = combineReducers({ postsReducer }, { setImageUrlReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
