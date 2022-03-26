import { Image } from 'react-native';
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

export const TEMP_USERS = [
  {
    user: 'Skub',
    image: jsPicUri,
  },
  {
    user: 'OsyrusGoodhomes',
    image: otPicUri,
  },
  {
    user: 'Scarlett',
    image: scarPic1Uri,
  },
  {
    user: 'CLT',
    image: krcltPicUri,
  },
  {
    user: 'KurtAcctTwo',
    image: friendsPicUri,
  },
];
