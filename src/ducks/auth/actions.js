import {SIGNUP, LOGIN, LOGOUT, UPDATE_SUBSCRIPTION,GET_API} from './types';
import Api from '../../utils/Api';

export function signup(data) {
  return {
    data: data,
    type: SIGNUP,
  };
}

export function login(data) {
  return {
    data: data,
    type: LOGIN,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function* getAPI(params) {
  let json = yield call(Api.get('getUserDetails?id=421&type=customer'));

  yield put({type: GET_API, test: json});
  return json;
}
export function updateSubscription(status) {
  console.log('action status', status);
  return {
    type: UPDATE_SUBSCRIPTION,
    status,
  };
}
