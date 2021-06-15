import firebase from 'firebase';
const getUser = () => firebase.auth().currentUser;

const writeUserData = (userId, name, email, imageUrl) => {
  firebase
    .database()
    .ref('users/' + userId)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl,
    });
};

const userData = (user, cb) =>
  firebase
    .database()
    .ref('users')
    .on('value', (data) => {
      const { uid, displayName, email, photoURL } = user;
      if (findData(data.val(), uid)) {
        writeUserData(uid, displayName, email, photoURL);
      }
      cb(data.val()[uid]);
    });

const findData = (data, uid) => {
  return Object.keys(data).length > 0 &&
    Object.keys(data).findIndex((elem) => elem === uid) === -1
    ? true
    : false;
};

const updateUserData = (userId, data, cb = () => {}) => {
  firebase
    .database()
    .ref('users/' + userId)
    .update(data)
    .then(cb)
    .catch((e) => console.log(e));
};

export { getUser, writeUserData, userData, updateUserData, findData };
