import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Button,
  Linking,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import firebase from 'firebase';

import styles from './styles';
import {authActions} from '../../ducks/auth';

import {NavigationService, DataHandler} from '../../utils';
import {Loader} from '../../common';
import AsyncStorage from '@react-native-community/async-storage';
import {subscribeToTopic} from '../../utils/FirebaseUtil';
import Images from '../../theme/Images';

class Signup extends Component {
  state = {
    // name: 'apple',
    // email: 'apple@gmail.com',
    // password: 'test@123',
    name: '',
    email: '',
    password: '',
    errorMessage: '',
    loading: false,
  };

  createNewUser = async () => {
    const {email, password} = this.state;
    const trimedEmail = email.trim().toLowerCase();
    const trimedPassword = password.trim().toLowerCase();
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    auth()
      .createUserWithEmailAndPassword(trimedEmail, trimedPassword)
      .then((user) => {
        const {uid} = user.user._user;
        console.log('user', user);
        firebase
          .database()
          .ref(`/users/${uid}`)
          .set({
            email: email,
            notification_token: fcmToken,
            created_at: Date.now(),
            is_subscribe: false,
          })
          .then(() => {
            console.log('abc abc');
            this.setState({loading: false}, () => {
              NavigationService.reset('Subscription'); //open it
              // subscribeToTopic();
              // NavigationService.reset('DrawerScreen');
              this.props.signup({uid});

              // if (Platform.OS === 'ios') {
              //   NavigationService.reset('Subscription');
              // } else {
              // subscribeToTopic();
              // NavigationService.reset('DrawerScreen');
              // }
              // this.props.signup({uid});
            });
          })
          .catch((error) => {
            console.log('error', error);
            this.setState({
              loading: false,
              errorMessage: 'Something went wrong. Please try Again',
            });
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.setState({
            loading: false,
            errorMessage: 'That email address is already in use!',
          });
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          this.setState({
            loading: false,
            errorMessage: 'That email address is invalid!',
          });
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  onCreateAcc = () => {
    const {email, password} = this.state;
    if (email !== '' && password !== '') {
      console.log('email', email, '|');
      console.log('password', password);
      this.setState({loading: true}, () => {
        this.createNewUser();
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

  onAlreadyHavAcc = () => {
    NavigationService.pop();
  };

  onChangeName = (name) => {
    this.setState({name});
  };

  onChangeEmail = (email) => {
    this.setState({email});
  };

  onChangePassword = (password) => {
    this.setState({password});
  };

  renderName() {
    const {name} = this.state;
    return (
      <TextInput
        placeholderTextColor="#ccc"
        placeholder={'Enter Name'}
        style={styles.inputField}
        onChangeText={this.onChangeName}
        value={name}
      />
    );
  }

  renderEmail() {
    const {email} = this.state;
    return (
      <TextInput
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCorrect={false}
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
    const {password} = this.state;
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
      <TouchableOpacity onPress={this.onCreateAcc} style={styles.btnContainer}>
        <Text style={styles.btnText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
    );
  }

  renderCreateAccount() {
    return (
      <Text onPress={this.onAlreadyHavAcc} style={styles.createAcc}>
        Already have an account?
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
        {this.renderName()}
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

const actions = {
  signup: authActions.signup,
};

const mapStateToProps = (store) => ({});

export default connect(mapStateToProps, actions)(Signup);
