export const SET_POSTS = 'SET_POSTS';
export const SET_IMAGEURL = 'SET_IMAGEURL';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const setCurrentUser = () => (dispatch) => {
  dispatch();
};

export const setPosts = (posts) => (dispatch) => {
  dispatch({
    type: SET_POSTS,
    payload: posts,
  });
};

export const setImageUrl = (imageUrl) => (dispatch) => {
  dispatch({
    type: SET_IMAGEURL,
    payload: imageUrl,
  });
};
