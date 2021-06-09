import {SIGNUP, LOGOUT, LOGIN, UPDATE_SUBSCRIPTION,GET_API} from './types';

const initialState = {
  isUserLoggedIn: false,
  uid: '',
  api: '',
  subscriptionActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP: {
      console.log(action.data);
      return {
        ...state,
        uid: action.data.uid,
        isUserLoggedIn: true,
      };
    }
    case LOGIN: {
      return {
        ...state,
        uid: action.data.uid,
        isUserLoggedIn: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        uid: '',
        isUserLoggedIn: false,
      };
    }
    case UPDATE_SUBSCRIPTION: {
      console.log('action reducer', action.status);
      return {
        ...state,
        subscriptionActive: action.status,
      };
    }
    case GET_API: {
      console.log('SIMPLE API RESPONSE ++++++++++++++++++++++++++++', action.status);
      return {
        ...state,
        api: action.data,
      };
    }
    
    default:
      return state;
  }
};
export const users = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      return action.payload
    default:
      return state
  }
}
