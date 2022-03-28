import { IMAGEURL_CHANGE } from './index';

export function changeImageUrl(image) {
  return {
    type: IMAGEURL_CHANGE,
    payload: image,
  };
}

const initialImageUrlState = {
  image: null,
};

export const imageUrlReducer = (state = initialImageUrlState, action) => {
  switch (action.type) {
    case IMAGEURL_CHANGE:
      return {
        ...state,
        image: action.payload,
      };
    default:
      return state;
  }
};
