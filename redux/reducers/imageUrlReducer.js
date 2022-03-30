import { IMAGE_URL } from '../constants/indexConstants';

const imageUrlReducer = (state = null, action) => {
  switch (action.type) {
    case IMAGE_URL:
      return { ...state, imageUrl: action.payload };
    default:
      return state;
  }
};

export default imageUrlReducer;
