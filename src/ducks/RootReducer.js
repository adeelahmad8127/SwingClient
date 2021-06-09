import {combineReducers} from 'redux';

import auth from './auth';
import reducer from '.././user/reducer'

const appReducer = combineReducers({
  auth,
  users : reducer
});
const RootReducer = (state, action) => {
  return appReducer(state, action);
};

export default RootReducer;
