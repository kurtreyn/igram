import { Image } from 'react-native';

import HOME_ACTIVE from '../assets/icon-home-active.png';
import HOME_INACTIVE from '../assets/icon-home-inactive.png';
import SEARCH_ACTIVE from '../assets/icon-search-active.png';
import SEARCH_INACTIVE from '../assets/icon-search-inactive.png';
import REELS_ACTIVE from '../assets/icon-reels-active.png';
import REELS_INACTIVE from '../assets/icon-reels-inactive.png';
import SHOP_ACTIVE from '../assets/icon-shop-active.png';
import SHOP_INACTIVE from '../assets/icon-shop-inactive.png';
import PROFILE_AVATAR from '../assets/profile-avatar.png';

const homeActive = Image.resolveAssetSource(HOME_ACTIVE).uri;
const homeInactive = Image.resolveAssetSource(HOME_INACTIVE).uri;
const searchActive = Image.resolveAssetSource(SEARCH_ACTIVE).uri;
const searchInactive = Image.resolveAssetSource(SEARCH_INACTIVE).uri;
const reelsActive = Image.resolveAssetSource(REELS_ACTIVE).uri;
const reelsInactive = Image.resolveAssetSource(REELS_INACTIVE).uri;
const shopActive = Image.resolveAssetSource(SHOP_ACTIVE).uri;
const shopInactive = Image.resolveAssetSource(SHOP_INACTIVE).uri;
const profilePicActive = Image.resolveAssetSource(PROFILE_AVATAR).uri;
const profilePicInactive = Image.resolveAssetSource(PROFILE_AVATAR).uri;

export const bottomTabIcons = [
  {
    name: 'Home',
    active: homeActive,
    inactive: homeInactive,
  },
  {
    name: 'Search',
    active: searchActive,
    inactive: searchInactive,
  },
  {
    name: 'Reels',
    active: reelsActive,
    inactive: reelsInactive,
  },
  {
    name: 'Shop',
    active: shopActive,
    inactive: shopInactive,
  },
  // {
  //   name: 'Profile',
  //   active: profilePicActive,
  //   inactive: profilePicInactive,
  // },
];
