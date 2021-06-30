import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import firebase from 'firebase';
import * as Actions from '../../user/actionIndex';
import { storeData } from '../../utils/LocalDB'

import styles from './styles';
import { authActions } from '../../ducks/auth';

import { NavigationService, DataHandler } from '../../utils';
import { Loader } from '../../common';
import AsyncStorage from '@react-native-community/async-storage';
import { subscribeToTopic } from '../../utils/FirebaseUtil';
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
    const { email, password, name } = this.state;
    const trimedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim()
    const trimedPassword = password.trim()
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    let params = {
      username: trimmedName,
      email: trimedEmail,
      password1: trimedPassword,
      password2: password,
    }
    this.props.signup(params).then(response => {
      if (response !== undefined) {
        this.handleSignUpResult(response)
        this.checkIsUserSubscribe(response.user.pk)
      }
    })

  };


  checkIsUserSubscribe = (uid) => {

    let params = {
      id: uid
    }

    console.log(params)

    this.props.checkSubscription(params).then(response => {
      if (response != undefined) {
        if (response.is_subscribed) {
          subscribeToTopic();
          this.props.navigation.navigate('DrawerScreen')
          // DataHandler.setUserSubscribe(is_subscribe);
          this.setState({ loading: false });
        } else {
          this.props.navigation.navigate('Subscription', { id: uid })
          this.setState({ loading: false });
        }
      } else {
        this.props.navigation.navigate('Subscription', { id: uid })
        this.setState({ loading: false });
      }
    })
  };


  handleSignUpResult = async (user) => {
    await storeData('user_data', JSON.stringify(user));
  };

  onCreateAcc = () => {
    const { email, password, name } = this.state;
    if (email !== '' && password !== '' && name !== '' && password.length >= 8) {
      console.log('email', email, '|');
      console.log('password', password);
      this.setState({ loading: true }, () => {
        this.createNewUser();
      });
    } else {
      this.setState({
        errorMessage: 'Please Enter Valid Email & Password',
      });
    }
  };

  onFocus = () => {
    this.setState({ errorMessage: '' });
  };

  onAlreadyHavAcc = () => {
    NavigationService.pop();
  };

  onChangeName = (name) => {
    this.setState({ name });
  };

  onChangeEmail = (email) => {
    this.setState({ email });
  };

  onChangePassword = (password) => {
    this.setState({ password });
  };

  renderName() {
    const { name } = this.state;
    return (
      <TextInput
        placeholderTextColor="#ccc"
        placeholder={'Enter Name'}
        style={styles.inputField}
        onChangeText={this.onChangeName}
        autoCapitalize="none"
        value={name}
      />
    );
  }

  renderEmail() {
    const { email } = this.state;
    return (
      <TextInput
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCorrect={false}
        placeholderTextColor="#ccc"
        autoCapitalize="none"
        placeholder={'Email'}
        style={styles.inputField}
        onChangeText={this.onChangeEmail}
        value={email}
        onFocus={this.onFocus}
      />
    );
  }

  renderPassword() {
    const { password } = this.state;
    return (
      <TextInput
        textContentType="password"
        placeholderTextColor="#ccc"
        placeholder={'Password'}
        style={styles.inputField}
        autoCapitalize="none"
        onChangeText={this.onChangePassword}
        value={password}
        secureTextEntry
        onFocus={this.onFocus}
      />
    );
  }

  renderErrorMessage() {
    const { errorMessage } = this.state;
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
    const { loading } = this.state;
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
        <Text style={{ color: '#fff' }}>and</Text>
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
        style={{ backgroundColor: '#000' }}
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

const actions = (dispatch) => {
  // login: authActions.login,
  return {
    signup: (params) => dispatch(Actions.signup(params)),
    checkSubscription: (params) => dispatch(Actions.checkSubscription(params))
  };
};

const mapStateToProps = (store) => ({});

export default connect(mapStateToProps, actions)(Signup);
