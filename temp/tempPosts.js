import { Image } from 'react-native';
import { TEMP_USERS } from './tempUser';
import friendsPic from '../assets/friends.jpg';
import jsPic from '../assets/js.jpg';
import krcltPic from '../assets/kr-clt.jpg';
import krPosePic from '../assets/kr-pose.jpg';
import krSmPic from '../assets/kr-sm.jpg';
import otPic from '../assets/ot.jpg';
import scarPic1 from '../assets/sc1.jpg';

const friendsPicUri = Image.resolveAssetSource(friendsPic).uri;
const jsPicUri = Image.resolveAssetSource(jsPic).uri;
const krcltPicUri = Image.resolveAssetSource(krcltPic).uri;
const krPosePicUri = Image.resolveAssetSource(krPosePic).uri;
const krSmPicUri = Image.resolveAssetSource(krSmPic).uri;
const otPicUri = Image.resolveAssetSource(otPic).uri;
const scarPic1Uri = Image.resolveAssetSource(scarPic1).uri;

export const TEMP_POSTS = [
  {
    id: 1,
    imageUrl: krPosePicUri,
    user: TEMP_USERS[0].user,
    likes: 7870,
    caption:
      'Wow! This build looks awesome. So flippin awesome. Did you build this?',
    profile_picture: TEMP_USERS[0].image,
    comments: [
      {
        user: 'Skube',
        comment:
          'Wow! This build looks awesome. So flippin awesome. Did you build this?',
      },
      {
        user: 'Skube',
        comment: 'Double posting',
      },
    ],
  },
  {
    id: 2,
    imageUrl: otPicUri,
    user: TEMP_USERS[1].user,
    likes: 7865,
    caption: 'BBQ time',
    profile_picture: TEMP_USERS[1].image,
    comments: [
      {
        user: 'myself',
        comment: 'Far out, bruh',
      },
    ],
  },
];
