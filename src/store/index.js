import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from '@react-native-community/async-storage'; //  AsyncStorage for react-native
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {handler as userSaga} from '../user/sagas'

import {whiteList} from '../config/ReduxStorage';
import RootReducer from '../ducks/RootReducer';
import RootSaga from '../ducks/RootSaga';
import sagas from '../user/sagas'

// check if chrome debugger is on
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export default function configureStore(onComplete: Function) {
  // init logger
  const logger = createLogger({
    predicate: () => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    diff: true,
  });

  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // create list of middleware
  const middlewareList = [sagaMiddleware];
  if (__DEV__) {
    // if dev push logger middle ware
    middlewareList.push(logger);
  }

  // init middleware with list
const middleware = applyMiddleware(promise, thunk);

  // init persist config - set which reducers to save
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: whiteList,
    stateReconciler: autoMergeLevel2,
  };

  // init redux persist reducer
  const persistedReducer = persistReducer(persistConfig, RootReducer);

  // create store with remote dev tools
  //const composeEnhancers = composeWithDevTools({ realtime: true });
  const store = createStore(persistedReducer, middleware);

  // set store in window
  if (isDebuggingInChrome) {
    window.store = store;
  }

  // init store with redux persist
  persistStore(store, null, () => onComplete(store));

  // then run the saga
}
