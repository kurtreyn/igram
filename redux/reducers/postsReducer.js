import { SET_POSTS } from '../constants/indexConstants';

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: [action.payload] };
    default:
      return state;
  }
};

export default postsReducer;
