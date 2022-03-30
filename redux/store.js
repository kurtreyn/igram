import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postsReducer } from './reducers';

// const rootReducer = combineReducers({ post: postsReducer });
const rootReducer = combineReducers({ postsReducer });

export const Store = createStore(rootReducer, {}, applyMiddleware(thunk));
