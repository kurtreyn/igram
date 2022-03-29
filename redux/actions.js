export const SET_POSTS = 'SET_POSTS';

export const setPosts = (posts) => {
  return (dispatch) => {
    dispatch({
      type: SET_POSTS,
      payload: posts,
    });
  };
};
