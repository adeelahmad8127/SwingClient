/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {
  View,
  StatusBar,
  Platform,
  Alert,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';

import {getData} from './utils/LocalDB';

import {Provider, connect} from 'react-redux';
import firebase from 'firebase';
import React from 'react';
import IAP from 'react-native-iap';
import {BannerView, AdSettings} from 'react-native-fbads';

import {DataHandler, FirebaseUtil, ConfigureApp} from './utils';
import AppNavigator from './navigator';
import configureStore from './store';
import {AppStyles} from './theme';
import {
  requestUserPermission,
  getFcmToken,
  cancelAllNotification,
  unubscribeToTopic,
  subscribeToTopic,
} from './utils/FirebaseUtil';
import InApp from './utils/InApp';
import {authActions} from './ducks/auth';

ConfigureApp();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    configureStore((store) => {
      this.checkUserLogin();
      this.setState({store});
      // DataHandler.setUserLogin(isUserLoggedIn);
      DataHandler.setStore(store);
      // this.initSettings(store);
      // this.setState({store});
    });
  }

  componentWillMount() {}

  componentDidMount() {
    SplashScreen.hide();
    const firebaseConfig = {
      apiKey: 'AIzaSyBWLSwtT64Aam5gofmCXBYQeIRBkZKj05o',
      authDomain: 'forex-9f7ac.firebaseapp.com',
      databaseURL: 'https://forex-9f7ac.firebaseio.com',
      projectId: 'forex-9f7ac',
      storageBucket: 'forex-9f7ac.appspot.com',
      messagingSenderId: '188121411103',
      appId: '1:188121411103:web:42165a806dfed1a72eaf2a',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log('firebase', firebase);
    }
  }

  componentWillUpdate() {
    cancelAllNotification();
  }
  state = {
    isLoading: true,
    store: null,
    isUserLoggedIn: false,
    isActiveSubscription: null,
  };

  initSettings = (store) => {
    const {isUserLoggedIn} = store.getState().auth;
    this.setState({store});
    DataHandler.setUserLogin(isUserLoggedIn);
    DataHandler.setStore(store);
    getFcmToken();
    console.log('===== validateUserSubscription ======');
    this.validateUserSubscription(store);
  };

  async validateUserSubscription(store) {
    // InApp.Init();
    SplashScreen.hide();
    this.setState({isLoading: false});
    console.log('Calling inap from startup');
    // InApp.Init((status) => {
    //   console.log('status', status);
    //   store.dispatch(authActions.updateSubscription(status));
    //   this.setState({isActiveSubscription: status});
    //   InApp.remove();
    //   setTimeout(() => {
    //     this.setState({isLoading: false});
    //   }, 2000);
    //   requestUserPermission();
    // });
  }

  checkAuthState() {
    auth().onAuthStateChanged(function (user) {
      console.log('onAuthStateChanged', user);
    });
  }

  checkUserLogin = async () => {
    let user = await getData('user_data');

    user = JSON.parse(user);
    SplashScreen.hide();
    let isUserLogin;
    try{
      isUserLogin = user.access_token != null;
    }catch(errror){
      isUserLogin = false
    }
    
    this.setState({isUserLoggedIn: isUserLogin, isLoading : false});
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.lodaingContainer}>
          <Text style={styles.text}>Fetching details please wait...</Text>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
      // return null;
    } else {
      const {isActiveSubscription} = this.state;
      // const isUserLogin = DataHandler.getUserLogin();
      // const isUserLogin = auth().currentUser;

      // console.log('===== isUserLogin =====', isUserLogin);
      // console.log('===== isActiveSubscription =====', isActiveSubscription);

      // let initialRouteName = 'Login';
      // if (isUserLogin && this.state.isActiveSubscription) {
      //   subscribeToTopic();
      //   initialRouteName = 'DrawerScreen';
      // } else if (isUserLogin && !this.state.isActiveSubscription) {
      //   unubscribeToTopic();
      //   initialRouteName = 'Subscription';
      // } else {
      //   initialRouteName = 'Login';
      // }
      // let initialRouteName = 'Login'
      const ios_id = '759533837975395_759535874641858';
      const android_id = '759533837975395_759534394642006';
      const banner_id = Platform.OS === 'ios' ? ios_id : android_id;

      // const initialRouteName =
      //   auth().currentUser && isActiveSubscription ? 'DrawerScreen' : 'Login';

      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{flex: 1, backgroundColor: '#000'}}>
          <StatusBar barStyle="dark-content" />
          {/* {this.checkUserLogin()} */}
          <Provider store={this.state.store}>
            {console.log('Status', this.state.isUserLoggedIn)}
            {this.state.isUserLoggedIn ? (
              <AppNavigator initialRouteName={'DrawerScreen'} />
            ) : (
              <AppNavigator initialRouteName={'Login'} />
            )}
          </Provider>
          {/* <View style={{backgroundColor: '#fff'}}>
          <BannerView
            placementId={banner_id}
            // placementId="320603868459075_592268954625897" // test id for ads
            type="standard"
            // onPress={() => alert('click')}
            // onLoad={() => alert('loaded')}
            onError={(err) => console.log('BannerView', err)}
          />
        </View> */}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  lodaingContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {color: '#fff', fontSize: 20, marginBottom: 20},
});

// react-native-keyboard-manager
// react-native-fbsdk
