import { Image } from 'react-native';

import likeIcon from '../assets/icons8-heart-50.png';
import likedIcon from '../assets/icons8-heart-filled-60.png';
import commentIcon from '../assets/icons8-comment-50.png';
import shareIcon from '../assets/icons8-email-send-60.png';
import saveIcon from '../assets/icons8-bookmark-50.png';

const likedIconUri = Image.resolveAssetSource(likedIcon).uri;
const likeIconUri = Image.resolveAssetSource(likeIcon).uri;
const commentIconUri = Image.resolveAssetSource(commentIcon).uri;
const shareIconUri = Image.resolveAssetSource(shareIcon).uri;
const saveIconUri = Image.resolveAssetSource(saveIcon).uri;

export const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: likeIconUri,
    likedImageUrl: likedIconUri,
  },
  {
    name: 'Comment',
    imageUrl: commentIconUri,
  },
  {
    name: 'Share',
    imageUrl: shareIconUri,
  },
  {
    name: 'Save',
    imageUrl: saveIconUri,
  },
];
