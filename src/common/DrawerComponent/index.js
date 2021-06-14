import React, {Component} from 'react';
import {
  Text,
  View,
  Linking,
  Image,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import RNExitApp from 'react-native-exit-app';
import auth from '@react-native-firebase/auth';
import Rate, {AndroidMarket} from 'react-native-rate';

import Colors from '../../theme/Colors';
import {authActions} from '../../ducks/auth';
import {NavigationService} from '../../utils';
import Images from '../../theme/Images';
import styles from './styles';
import {unubscribeToTopic} from '../../utils/FirebaseUtil';
import { storeData  } from '../../utils/LocalDB';

const {width, height} = Dimensions.get('window');

class DrawerComponent extends Component {
  onLogout = () => {
    unubscribeToTopic();
    this.props.logout();
    this.logoutUser()
    NavigationService.reset('Login');
    
    // auth()
    //   .signOut()
    //   .then(() => {
    //     console.log('User Successfully Sign out');
    //   });
  };

  logoutUser= async()=>{
    await storeData("user_data","")
  }

  onExit = () => {
    NavigationService.toggleDrawer();
    Alert.alert(
      'Are you sure you want to exit?',
      null,
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => RNExitApp.exitApp()},
      ],
      {cancelable: false},
    );
  };

  onRateAppPress = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('market://details?id=com.swing_trading_signals');
    } else if (Platform.OS === 'ios') {
      const options = {
        AppleAppID: '310633997',
        GooglePackageName: 'com.mywebsite.myapp',
        AmazonPackageName: 'com.mywebsite.myapp',
        OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
        preferredAndroidMarket: AndroidMarket.Google,
        preferInApp: false,
        openAppStoreIfInAppFails: true,
        fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html',
      };
      Rate.rate(options, (success) => {
        if (success) {
          // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
          this.setState({rated: true});
        }
      });
    }
  };

  render() {
    return (
      <DrawerContentScrollView {...this.props}>
        <View style={styles.container}>
          <Image source={Images.icons.logo} style={styles.logo} />
          <Text style={styles.title}>Swing Trading Signal</Text>
        </View>
        <DrawerItemList
          {...this.props}
          activeTintColor={Colors.green}
          inactiveTintColor={'#000'}
        />
        <DrawerItem
          label="Help"
          activeTintColor={Colors.green}
          inactiveTintColor={'#000'}
          onPress={() => Linking.openURL('mailto:support@example.com')}
        />
        <DrawerItem
          label="Rate This App"
          activeTintColor={Colors.green}
          inactiveTintColor={'#000'}
          onPress={this.onRateAppPress}
        />
        <DrawerItem
          label="Logout"
          activeTintColor={Colors.green}
          inactiveTintColor={'#000'}
          onPress={this.onLogout}
        />
        <DrawerItem
          label="Exit"
          activeTintColor={Colors.green}
          inactiveTintColor={'#000'}
          onPress={this.onExit}
        />
      </DrawerContentScrollView>
    );
  }
}

const actions = {
  logout: authActions.logout,
};

const mapStateToProps = (store) => ({});

export default connect(mapStateToProps, actions)(DrawerComponent);
