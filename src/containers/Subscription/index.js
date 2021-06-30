import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Linking,
  Platform,
} from 'react-native';
import Images from '../../theme/Images';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {subscribeToTopic} from '../../utils/FirebaseUtil';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import styles from './styles';
import {NavigationService, DataHandler, InApp} from '../../utils';
import {Loader} from '../../common';
import {authActions} from '../../ducks/auth';
import {ScrollView} from 'react-native-gesture-handler';
import * as Actions from '../../user/actionIndex';
import { storeData, getData } from '../../utils/LocalDB';

functions().useFunctionsEmulator('http://localhost:8081');

class Subscription extends Component {
  state = {
    loader: false,
  };
  

  // componentWillMount() {
  //   InApp.remove();
  // }

  componentDidMount() {
    console.log('Calling inap from subscription');
    InApp.Init();
  }

  componentWillUnmount() {
    // InApp.remove();
  }

  logout = () => {
    // auth().signOut();
    NavigationService.reset('Login');
    // console.log('signOut');
    this.logoutUser();
  };

  
  logoutUser= async()=>{
    await storeData("user_data","")
  }

  subscribeUser = () => {
    // const {uid} = this.props;
    
    let params = {
      user_id : this.props.id,
      is_subscribed : true
    }

    this.props.purchaseSubscription(params).then(res =>{
      if(res!=undefined){
        if (res[0].is_subscribed) {
          this.props.navigation.navigate("DrawerScreen")
        }
      }
    })
  };

  onSubscribePress = async () => {
    console.log('onSubscribePress');
    const data = {
      sku_id: 'swingsubscription1',
      purchase_token: 'swingsubscription1',
      package_name: 'com.swing_trading_signals',
    };

    // functions()
    //   .httpsCallable('verifySubscription', {timeout: 100000000})(data)
    //   .then((response) => {
    //     console.log('firebase response', response);
    //   })
    //   .catch((err) => {
    //     console.log('firebase err', err);
    //   });

    const receiptBody = {
      // sku_id: 'swingsubscription1',
      // purchase_token: 'swingsubscription1',
      // package_name: 'com.swing_trading_signals',
      name: 'Hamas ios recipt',
      price: '200',
    };

    // const receipt = await fetch(
    //   'https://us-central1-forex-9f7ac.cloudfunctions.net/veriftySubscriptionIOS',
    //   {
    //     headers: {'Content-Type': 'application/json'},
    //     method: 'POST',
    //     body: JSON.stringify({data: receiptBody}),
    //   },
    // );

    this.setState({loading: true});
    
    // By Pass Security
    // subscribeToTopic();
    // NavigationService.reset('DrawerScreen');
    InApp.requestSubscription('', (success) => {
      if (success) {
        this.subscribeUser();
        console.log('Item Successfully Purchsased');
        this.props.updateSubscription(true);
        subscribeToTopic();
        NavigationService.reset('DrawerScreen');
        // this._sendSubscribeRequest(AppUtil.subscriptionData(item));
        // eslint-disable-next-line no-empty
        this.setState({loading: false});
      } else {
        this.setState({loading: false});
      }
    });
  };

  renderLogo() {
    return (
      <View style={styles.logoContainer}>
        <Image source={Images.icons.logo} style={styles.logo} />
        <Text style={styles.logoText}>
          Swing Trading Signals Monthly Subscription
        </Text>
      </View>
    );
  }

  renderDetails() {
    return (
      <Text style={styles.details}>
        The first month is free. Please subscribe to get started.
      </Text>
    );
  }

  renderSubsribeButton() {
    return (
      <TouchableOpacity
        onPress={this.onSubscribePress}
        style={styles.subscribeBtnContainer}>
        <Image
          resizeMode="contain"
          source={Images.icons.subscription}
          style={styles.subscribe}
        />
        <Text style={styles.subscribeText}>SUBSCRIBE</Text>
      </TouchableOpacity>
    );
  }

  renderLoader() {
    const {loading} = this.state;
    return <Loader loading={loading} color={'#000'} />;
  }

  renderSubscriptionDetails() {
    return (
      <View style={{alignItems: 'center', paddingHorizontal: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Subscription Info
        </Text>
        <Text style={{textAlign: 'center', marginTop: 10}}>
          You may purchase an auto-renewing subscription through an In-App
          Purchase.
        </Text>
        <Text style={{textAlign: 'center', marginTop: 10, fontWeight: '600'}}>
          Auto-renewable subscription
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          1 month ($14.99)
        </Text>
        <Text style={{textAlign: 'center', marginTop: 10}}>
          Your subscription will be charged to your iTunes account at
          confirmation of purchase and will automatically renew every month
          unless auto-renew is turned off at least 24 hours before the end of
          the current period.
        </Text>
        <Text style={{textAlign: 'center', marginTop: 10}}>
          Current subscription may not be cancelled during the active
          subscription period; however, you can manage your subscription and/or
          turn off auto-renewal by visiting your iTunes Account Settings after
          purchase
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button
            title="Privacy policy"
            onPress={() => {
              Linking.openURL('https://forexprofitbot.com/privacy-policy/');
            }}
          />
          <Text>and</Text>
          <Button
            title="Terms of use"
            onPress={() => {
              Linking.openURL(
                'https://forexprofitbot.com/terms-of-service-agreement',
              );
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderLogo()}
        {this.renderDetails()}
        {Platform.OS === 'ios' && this.renderSubscriptionDetails()}
        {this.renderSubsribeButton()}
        {this.renderLoader()}
        <Button title="Logout" onPress={this.logout} />
      </ScrollView>
    );
  }
}

const mapDispatchToProps =()=> {
  return {
    purchaseSubscription: (params) => dispatch(Actions.purchaseSubscription(params))
  }
};

const mapStateToProps = (store) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
