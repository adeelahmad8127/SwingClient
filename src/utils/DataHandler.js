let store;
let isUserLogin;
let fcmToken;
let isSubscribed;
let iapActive = false;

function setStore(st) {
  store = st;
}

function getStore() {
  return store;
}

function setUserLogin(islogin) {
  isUserLogin = islogin;
}

function getUserLogin() {
  return isUserLogin;
}

function setFcmToken(token) {
  fcmToken = token;
}

function getFcmToken() {
  return fcmToken;
}

function setUserSubscribe(sub) {
  isSubscribed = sub;
}

function getUserSubscribe() {
  return isSubscribed;
}

function setIAPTrue() {
  iapActive = true;
}

function isIAPActive() {
  return iapActive;
}

export default {
  setStore,
  getStore,
  setUserLogin,
  getUserLogin,
  setFcmToken,
  getFcmToken,
  setUserSubscribe,
  getUserSubscribe,
  setIAPTrue,
  isIAPActive,
};
