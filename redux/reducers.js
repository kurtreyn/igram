import {SET_POSTS} from './actions'

const initialState = {
    posts: [],
   
}

export const userReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, posts: action.payload };
    
        default:
            return state;
    }
}