//Helpers
//Config
import {BASE_URL} from './Config';
import Toast from 'react-native-tiny-toast';
import {getData} from './LocalDB';

class Api {
  static headers() {
    return {
        'Content-Type': 'application/json'
      };
  }

  static get(route) {
    return this.func(route, null, 'GET');
  }
  static put(route, params) {
    return this.func(route, params, 'PUT');
  }
  static post(route, params, withImage) {
    return this.func(route, params, 'POST', withImage);
  }
  static delete(route, params) {
    return this.func(route, params, 'DELETE');
  }

  static async func(route, params, verb, withImage) {
    const url = `${BASE_URL}/${route}`;
    let options = null;

    if (withImage != undefined) {
      options = {
        method: verb,
        body: params,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
    } else {
      options = Object.assign(
        {method: verb},
        params ? {body: JSON.stringify(params)} : null,
      );
      options.headers = Api.headers();
    }

    let user = await getData('user_data');
    user = JSON.parse(user)
    console.log("user",options)
    if (user !== null) {
        options.headers['Authorization'] = `Bearer ${user.access_token}`;
    }
  

    console.log('options',url);

    // console.log('url is ', url)
    // console.log('options is ', options)

    return fetch(url, options)
      .then(async (resp) => {
        // console.log('resp is ', resp)

        let json = await resp.json();
        console.log('json is ', json);
        if (resp.ok) {
          return json;
        } else {
          Toast.show(json.message ? json.message : json.msg);
          return;
        }
      })
      .catch((json) => {
        // console.log('error is ', json)
        Toast.show(json);

        // Api.showAlert();
        return;
      });
  }
}
export default Api;
