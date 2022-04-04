import {
  SET_POSTS,
  IMAGE_URL,
  SET_CAPTION,
  SET_LOADING,
  SET_PROGRESS,
  SET_VIEW,
} from '../constants/indexConstants';

const initialState = {
  imageUrl: null,
  posts: [],
  loading: false,
  username: null,
  profilePicture: null,
  caption: '',
  progress: null,
  view: 'Gallery',
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_URL:
      return { ...state, imageUrl: action.payload };
    case SET_POSTS:
      return { ...state, posts: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_PROGRESS:
      return { ...state, progress: action.payload };
    case SET_CAPTION:
      return { ...state, caption: action.payload };
    case SET_VIEW:
      return { ...state, caption: action.payload };
    default:
      return state;
  }
};

export default Reducer;
