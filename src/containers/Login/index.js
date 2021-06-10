import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Linking,
  Platform,
} from 'react-native';

import * as Actions from '../../user/actionIndex'
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {BannerView, AdSettings} from 'react-native-fbads';

import styles from './styles';

import {NavigationService, DataHandler} from '../../utils';
import {authActions} from '../../ducks/auth';
import {Loader} from '../../common';
import {subscribeToTopic} from '../../utils/FirebaseUtil';
import Images from '../../theme/Images';
import {ScrollView} from 'react-native-gesture-handler';
import { LoginManager } from 'react-native-fbsdk';
import { login } from '../../ducks/auth/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: '',
    loading: false,
  };

  componentWillMount() {
    console.log('AdSettings.currentDeviceHash', AdSettings.currentDeviceHash);
    AdSettings.clearTestDevices();
    AdSettings.addTestDevice(AdSettings.currentDeviceHash);
  }

  checkIsUserSubscribe = (uid) => {
    firebase
      .database()
      .ref(`users/${uid}`)
      .once('value', (snapshot) => {
        console.log('snapshot.val()', snapshot.val());
        const {is_subscribe} = snapshot.val();
        if (snapshot.val().is_subscribe) {
          subscribeToTopic();
          NavigationService.reset('DrawerScreen');
          DataHandler.setUserSubscribe(is_subscribe);
          this.props.login({uid});
          this.setState({loading: false});
        } else {
          NavigationService.reset('Subscription');
          this.props.login({uid});
        }
      });
  };

  onSignIn = () => {
    const {email, password} = this.state;
    if (email !== '' && password !== '') {
      const trimedEmail = email.trim().toLowerCase();
      const trimedPassword = password.trim();
      let params = { 
        username : email,
        password : password
      }
      this.setState({loading: true}, () => {
        this.props.login(params)
          .then((user) => {
            this.setState({loading : false})
            // console.log('user', user);
            // const {uid} = user.user._user;
            // const {isSubscribed} = this.props;
            // // this.checkIsUserSubscribe(uid); //open it
            // console.log('isSubscribed', isSubscribed);
            // if (isSubscribed) {
            //   // this.props.login({uid});

            //   subscribeToTopic();
            //   NavigationService.reset('DrawerScreen');
            // } else {
            //   NavigationService.reset('Subscription');
            // }
          })
          .catch((error) => {
            console.log('error', error);
            if (error.code === 'auth/user-not-found') {
              this.setState({
                loading: false,
                errorMessage: 'No user found with this email!',
              });
            }
            if (error.code === 'auth/email-already-in-use') {
              this.setState({
                loading: false,
                errorMessage: 'That email address is already in use!',
              });
            }
            if (error.code === 'auth/invalid-email') {
              this.setState({
                loading: false,
                errorMessage: 'That email address is invalid!',
              });
            }
            if (error.code === 'auth/wrong-password') {
              this.setState({
                loading: false,
                errorMessage: 'That password is invalid!',
              });
            }
          });
      });
    } else {
      this.setState({
        errorMessage: 'Please Enter Email & Password',
      });
    }
  };

  onFocus = () => {
    this.setState({errorMessage: ''});
  };

  onCreateAccPress = () => {
    NavigationService.navigate('Signup');
  };

  onChangeEmail = (email) => {
    this.setState({email});
  };

  onChangePassword = (password) => {
    this.setState({password});
  };

  renderEmail() {
    const {email} = this.props;
    return (
      <TextInput
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="#ccc"
        placeholder={'Email'}
        style={styles.inputField}
        onChangeText={this.onChangeEmail}
        value={email}
        onFocus={this.onFocus}
      />
    );
  }

  renderPassword() {
    const {password} = this.props;
    return (
      <TextInput
        textContentType="password"
        placeholderTextColor="#ccc"
        placeholder={'Password'}
        style={styles.inputField}
        onChangeText={this.onChangePassword}
        value={password}
        secureTextEntry
        onFocus={this.onFocus}
      />
    );
  }

  renderErrorMessage() {
    const {errorMessage} = this.state;
    if (errorMessage === '') {
      return null;
    }
    return (
      <Text onPress={this.onAlreadyHavAcc} style={styles.errorMessage}>
        {errorMessage}
      </Text>
    );
  }

  renderSignUpButton() {
    return (
      <TouchableOpacity onPress={this.onSignIn} style={styles.btnContainer}>
        <Text style={styles.btnText}>SIGN IN</Text>
      </TouchableOpacity>
    );
  }

  renderCreateAccount() {
    return (
      <Text onPress={this.onCreateAccPress} style={styles.createAcc}>
        Create account here?
      </Text>
    );
  }

  renderLogo() {
    return (
      <View style={styles.logoContainer}>
        <Image style={styles.logoImg} source={Images.icons.logo} />
      </View>
    );
  }

  renderLoader() {
    const {loading} = this.state;
    return <Loader loading={loading} color={'#fff'} />;
  }

  renderTermsAndPriivacy() {
    return (
      <View style={styles.termsAndUse}>
        <Button
          title="Privacy policy"
          onPress={() => {
            Linking.openURL('https://forexprofitbot.com/privacy-policy/');
          }}
        />
        <Text style={{color: '#fff'}}>and</Text>
        <Button
          title="Terms of use"
          onPress={() => {
            Linking.openURL(
              'https://forexprofitbot.com/terms-of-service-agreement',
            );
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <ScrollView
        style={{backgroundColor: '#000'}}
        contentContainerStyle={styles.container}>
        {this.renderLogo()}
        {this.renderEmail()}
        {this.renderPassword()}
        {this.renderErrorMessage()}
        {this.renderSignUpButton()}
        {this.renderCreateAccount()}
        {this.renderLoader()}
        {Platform.OS === 'ios' && this.renderTermsAndPriivacy()}
      </ScrollView>
    );
  }
}
const actions = (dispatch) => {
  // login: authActions.login,
 return {
    login: (params) => dispatch(Actions.login(params)),
  }
}

const mapStateToProps = (store) => ({
  isSubscribed: store.auth.subscriptionActive,
});

export default connect(mapStateToProps, actions)(Login);
