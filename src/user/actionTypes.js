import {GET_ALL_USERS} from './action'

import Api from '../utils/Api'




export const login = (params) => {
    return async (dispatch) => {
      let response = await Api.post(
          `dj-rest-auth/login/`,
      params);
      console.log("HELLOO",response)
    //   if (response.success) {
    //     dispatch(savePromos(response.promos))
    //   }
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