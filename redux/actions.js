export const SET_POSTS = 'SET_POSTS';
export const SET_IMAGEURL = 'SET_IMAGEURL';

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
