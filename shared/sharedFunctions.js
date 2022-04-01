import { firebase, db } from '../firebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const user = firebase.auth().currentUser;
export const uuid = uuidv4();
