import {GET_ALL_USERS} from './action'

import Api from '../utils/Api'
import { Alert } from 'react-native';




export const login = (params) => {
    return async (dispatch) => {
      let response = await Api.post(
          `dj-rest-auth/login/`,
      params);
      if (response ===undefined){
        alert("Invalid Username or password")
      }
      return response;
    };
  };


  export const signup = (params) => {
    return async (dispatch) => {
      let response = await Api.post(
          `dj-rest-auth/registration/`,
      params);
      if (response ===undefined){
        Alert.alert("Invalid Username Email or Password",
        "Please make sure that \nUsername must be unique\nEmail must be unique\nPassword must be of at least 8 characters \nPassword must contain at least numeric and alphabets")
      }
      return response;
    };
  };

  

  export const getStats = (params) => {
    return async (dispatch) => {
      let response = await Api.get(
          `signal/statistics/`,
      params);
      if (response ===undefined){
        alert("Something went wrong")
      }
      return response;
    };
  };
  
// export const placeOrder = (params) => {
//     return async (dispatch) => {
//       let response = await Api.post('customer/placeOrder', params);
//       if (response.success) {
//         showToast(response.message);
//       }
//       return response;
//     };
//   };