import SplashScreen from 'react-native-splash-screen';

import React, {Component} from 'react';
import {Text, View, Platform, Button,SafeAreaView} from 'react-native';
import IAP from 'react-native-iap';

const items = Platform.select({
  ios: ['swingsubscription1'],
  android: ['swingsubscription1'], //swingsubscription1 test
  // android: ['android.test.purchased'], //swingsubscription1 test
});

let purchaseUpdatedListener;
let purchaseErrorListener;

// step 1 - connect store
// step 2 - fetch subscription or products

export default class App extends Component {
  state = {
    purchased: false,
    subscription: {},
  };

  componentWillMount() {
    // step 1 - connect store
    IAP.initConnection()
      .catch(() => {
        console.log('-- Error connnecting to Store... ---');
      })
      .then(() => {
        console.log('-- Connected to Store... ---');
        // step 2 - fetch subscription or products
        IAP.getSubscriptions(items)
          .catch(() => {
            console.log('-- Error fetching subscription... ---');
          })
          .then((response) => {
            this.setState({subscription: response});
            console.log('--- subscriptionn... ---', this.state.subscription);
          });
      });

    IAP.getPurchaseHistory()
      .catch(() => {})
      .then((response) => {
        const reciptt = response[response.length - 1].transactionReceipt;
        if (reciptt) {
          this.validate(reciptt);
        }
      });

    purchaseUpdatedListener = IAP.purchaseUpdatedListener((purchase) => {
      try {
        const receipt = purchase.transactionReceipt;
        console.log('receipt', receipt);
        this.setState({purchased: true});
      } catch (error) {}
    });
  }

  validate = async (receipt, callback) => {
    const recipttBody = {
      'receipt-data': receipt,
      password: '1656a531d7f740e5a7829703456b8baf',
    };
    // const deliveryReceipt = await fetch(
    //   'https://us-central1-forex-9f7ac.cloudfunctions.net/veriftySubscriptionIOS',
    //   {
    //     headers: {'Content-Type': 'application/json'},
    //     method: 'POST',
    //     body: JSON.stringify({data: recipttBody}),
    //   },
    // ).then((res) => {
    //   res.json().then((data) => {
    //     console.log('deliveryReceipt', data.result.isExpired);
    //     const expired = data.result.isExpired;
    //     if (!expired) {
    //       // navigate user to in-app
    //       // callback(true); // cb to send if user have validate purchase
    //       console.log('Subscription Not Expired');
    //     } else {
    //       // callback(false); // cb to send if user have no validate purchase
    //       console.log('Subscription  Expired');
    //     }
    //   });
    // });

    await IAP.validateReceiptIos(recipttBody, true)
      .then((res) => {
        console.log('validate', res);
        try {
          const renewalRecipt = res.latest_receipt_info;
          const expiration = renewalRecipt[0].expires_date_ms;
          console.log('expiration', expiration);
          let expired = Date.now() > expiration;
          console.log('expired', expired);
          if (!expired) {
            console.log('Subscription -----> Not Expired');
            // cb to send if user have validate purchase
            this.successHandler === undefined
              ? callback(true)
              : this.successHandler(true);
            // this.successHandler(true);
            console.log('Subscription Not Expired');
          } else {
            console.log('Subscription -----> Expired');
            // cb to send if user have no validate purchase
            this.successHandler === undefined
              ? callback(false)
              : this.successHandler(false);
          }
        } catch (error) {
          console.log('not working', error);
        }
      })
      .catch((err) => {
        // if user is not sign in to apple account in app user will ask first to login if user cancel we will handle it here
        console.log('err', err);
      });
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const {subscription, purchased} = this.state;

    if (purchased) {
      return (
        <SafeAreaView>
          <Text>Welcome</Text>
        </SafeAreaView>
      );
    } else {
      if (subscription.length > 0) {
        return (
          <SafeAreaView
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text> {this.state.subscription[0].title} </Text>
            <Button
              title="Subscribe"
              onPress={() => {
                IAP.requestSubscription('swingsubscription1');
              }}
            />
          </SafeAreaView>
        );
      }

      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>Fetching...</Text>
        </View>
      );
    }
  }
}
