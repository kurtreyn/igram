import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/indexReducers';
import thunk from 'redux-thunk';

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
