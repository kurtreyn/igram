import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postsReducer, setImageUrlReducer } from './reducers';

// const rootReducer = combineReducers({ postsReducer }, { setImageUrlReducer });

const Reducers = combineReducers({
  userState: user,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Reducers;
