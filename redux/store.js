import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import setPostsReducer from './reducers';

const rootReducer = combineReducers({ setPostsReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
