import { firebase, db } from '../firebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const user = firebase.auth().currentUser;
export const uuid = uuidv4();
export const getUserName = () => {
  const unsubscribe = db
    .collection('users')
    .where('owner_uid', '==', user.uid)
    .limit(1)
    .onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        // below is setting state
        setCurrentLoggedInUser({
          username: doc.data().username,
          profilePicture: doc.data().profile_picture,
        });
      })
    );
  return unsubscribe;
};
