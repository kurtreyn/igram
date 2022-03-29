export const SET_POSTS = 'SET_POSTS'

export const setPosts = post => dispatch => {
    dispatch({
        type: SET_POSTS,
        payload: post,
    });
};