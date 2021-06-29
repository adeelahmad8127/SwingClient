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

  
  export const getHistory = (params) => {
    return async (dispatch) => {
      let response = await Api.get(
          `signal/list?trading_type=` + params.type,
      params);
      if (response ===undefined){
        alert("Something went wrong")
      }
      return response;
    };
  };


  
  export const getSignal = (params) => {
    return async (dispatch) => {
      let response = await Api.get(
          `signalHistory?created_date=` + params.date + '&trading_type='+params.type);
      if (response ===undefined){
        alert("Something went wrong")
      }
      return response;
    };
  };


  

  export const createSignal = (params) => {
    return async (dispatch) => {
      let response = await Api.post(
          `signal`,
      params);
      console.log(response + "")
      if (response ===undefined){
        Alert.alert("Invalid Response")
      }
      return response;
    };
  };

  
  export const updateSignal = (params) => {
    return async (dispatch) => {
      let response = await Api.put(
          `signal`,
      params);
      if (response ===undefined){
        Alert.alert("Invalid Response")
      }
      return response;
    };
  };


  
  export const checkSubscription = (params) => {
    return async (dispatch) => {
      let response = await Api.get(
          `accounts/subscription?user_id=`+params.id);
      return response;
    };
  };

  

  export const purchaseSubscription = (params) => {
    return async (dispatch) => {
      let response = await Api.post(
        `accounts/subscription`,
      params);
      console.log(response + "")
      if (response ===undefined){
        Alert.alert("Invalid Response")
      }
      return response;
    };
  };

  checkSubscription
// export const placeOrder = (params) => {
//     return async (dispatch) => {
//       let response = await Api.post('customer/placeOrder', params);
//       if (response.success) {
//         showToast(response.message);
//       }
//       return response;
//     };
//   };