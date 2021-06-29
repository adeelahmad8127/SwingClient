import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
  getProducts,
  prepare,
} from 'react-native-iap';
import {Platform, Alert} from 'react-native';
import functions from '@react-native-firebase/functions';
import _ from 'lodash';

if (__DEV__) {
  functions().useFunctionsEmulator('http://localhost:8081');
}
import {DataHandler} from '.';
//import InAppBilling from "react-native-billing";
import React from 'react';

const successHandler = null;
const validationHandler = null;

const itemSkus = Platform.select({
  ios: ['swingsubscription1'],
  android: ['swingsubscription1'], //swingsubscription1 test
  // android: ['android.test.purchased'], //swingsubscription1 test
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

class InApp {
  Init = async (callback) => {
    try {
      const result = await RNIap.initConnection();
      console.log('Result: ', result);
      this.getSubscriptions();
      callback && this.getPurchaseHistory(callback);
      !callback && this.purchaseErrorHandler();
      !callback && this.purchaseHandler();
      DataHandler.setIAPTrue();
    } catch (err) {
      console.warn(err.code, err.message);
      this.purchaseErrorHandler(err.code)
      alert('Error: ' + err.message);
    }
  };

  async getSubscriptions() {
    try {
      const products = await RNIap.getSubscriptions(itemSkus);
      console.log('Get Subscriptions Done', products);
    } catch (err) {
      console.log('Get Subscription Error:  ', err); // standardized err.code and err.message available
    }
  }

  requestSubscription = (sku, callback) => {
    this.successHandler = callback;
    try {
      RNIap.requestSubscription('swingsubscription1', false);
      console.log('purchasing Subscription');
    } catch (err) {
      alert('sorry');
      console.warn(err.code, err.message);
    }
  };

  async purchaseHandler(callback) {
    purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        console.log('purchaseHandler receipt', receipt);
        try {
          if (Platform.OS === 'ios') {
            console.log('Ios Purchase Done');
            finishTransactionIOS(purchase.transactionId);
            this.validateIOS(receipt, callback);
          } else if (Platform.OS === 'android') {
            this.validateAndroid(purchase, callback);
            consumePurchaseAndroid(purchase.purchaseToken);
            //acknowledgePurchaseAndroid(purchase.purchaseToken);
            // this.successHandler(true);
          }
          const ackResult = await finishTransaction(purchase);
        } catch (ackErr) {
          this.successHandler(false);
          console.warn('ackErr', ackErr);
        }
        //  this.setState({ receipt }, () => this.goNext());
      }
    });
  }

  async getPurchaseHistory(callback) {
    const response = await RNIap.getPurchaseHistory();
    console.log('PURCHASE HISTORY  ====>', response);
    if (!_.isEmpty(response)) {
      if (Platform.OS === 'ios') {
        const reciptt = response[response.length - 1].transactionReceipt;
        console.log('=== reciptt ===', reciptt);
        if (reciptt) {
          this.validateIOS(reciptt, callback);
        }
      } else if (Platform.OS === 'android') {
        const purchaseToken = response[response.length - 1];
        this.validateAndroid(purchaseToken, callback);
      }
    } else {
      callback(false);
    }
  }

  validateIOS = async (receipt, callback) => {
    const recipttBody = {
      'receipt-data': receipt,
      password: '1656a531d7f740e5a7829703456b8baf',
    };

    //  ++++++++++++ VALIDATE WITH FIREBASE ++++++++++++
    //
    //
    // console.log('VALIDATE WITH FIREBASE');
    // await fetch(
    //   'https://us-central1-forex-9f7ac.cloudfunctions.net/veriftySubscriptionIOS',
    //   {
    //     headers: {'Content-Type': 'application/json'},
    //     method: 'POST',
    //     body: JSON.stringify({data: recipttBody}),
    //   },
    // )
    //   .then((res) => {
    //     res.json().then((data) => {
    //       const expired = data.result.isExpired;
    //       console.log('expired', expired);
    //       if (!expired) {
    //         console.log('Subscription -----> Not Expired');
    //         // cb to send if user have validate purchase
    //         this.successHandler === undefined
    //           ? callback(true)
    //           : this.successHandler(true);
    //         // this.successHandler(true);
    //         console.log('Subscription Not Expired');
    //       } else {
    //         console.log('Subscription -----> Expired');
    //         // cb to send if user have no validate purchase
    //         this.successHandler === undefined
    //           ? callback(false)
    //           : this.successHandler(false);
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     console.log('error'), error;
    //     this.successHandler === undefined
    //       ? callback(false)
    //       : this.successHandler(false);
    //   });
    //
    //
    //  ++++++++++++++++++++++++++++++++++++++++++++++++
    //
    //
    //  ++++++++++++ VALIDATE WITHOUT FIREBASE ++++++++++++
    //
    //
    console.log('VALIDATE WITHOUT FIREBASE');
    await RNIap.validateReceiptIos(recipttBody, false)
      .then((res) => {
        try {
          const renewalRecipt = res.latest_receipt_info;
          const expiration =
            renewalRecipt[renewalRecipt.length - 1].expires_date_ms;
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
    //
    //
    //  ++++++++++++++++++++++++++++++++++++++++++++++++
  };

  validateAndroid = async (purchase, callback) => {
    console.log(' this.successHandler ', this.successHandler);
    const recipttBody = {
      sku_id: 'swingsubscription1',
      purchase_token: purchase.purchaseToken,
      package_name: 'com.swing_trading_signals',
    };
    // callback(false);
    console.log('validateAndroid -> ', recipttBody);
    console.log('Calling firebase -> ');
    await fetch(
      'https://us-central1-forex-9f7ac.cloudfunctions.net/verifySubscriptionAndroid',
      {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({data: recipttBody}),
      },
    )
      .then((res) => {
        res.json().then((data) => {
          console.log('sub', data.result.subscription);
          const expiryTime = data.result.subscription.expiryTimeMillis;
          const cancelationtime =
            data.result.subscription.userCancellationTimeMillis;
          console.log('cancelationtime', cancelationtime);
          console.log('expiryTime', expiryTime);
          const expired = Date.now() > expiryTime;
          console.log('expired', expired);
          if (cancelationtime) {
            this.successHandler === undefined
              ? callback(false)
              : this.successHandler(false);
          } else {
            if (!expired) {
              console.log('Subscription -----> Not Expired');
              // cb to send if user have validate purchase
              console.log('this.successHandler', this.successHandler);
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
          }
        });
      })
      .catch((error) => {
        console.log('error', error);
        this.successHandler === undefined
          ? callback(false)
          : this.purchaseErrorHandler();
      });
  };

  purchaseErrorHandler = async () => {
    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
        console.log(
          'this.successHandler purchaseErrorHandler',
          this.successHandler,
        );
        if (error.responseCode === '2') {
          Alert.alert(
            'Subscrption purchase is canceled by you',
            null,
            [
              {
                text: 'OK',
                onPress: () => this.successHandler(false),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(
            'Something went wrong please try again.',
            null,
            [
              {
                text: 'OK',
                onPress: () => this.successHandler(false),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
      },
    );
  };

  remove() {
    console.log('Unmounted');
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
  }
}

export default new InApp();

// import RNIap, {
//   InAppPurchase,
//   PurchaseError,
//   SubscriptionPurchase,
//   acknowledgePurchaseAndroid,
//   consumePurchaseAndroid,
//   finishTransaction,
//   finishTransactionIOS,
//   purchaseErrorListener,
//   purchaseUpdatedListener,
//   getProducts,
//   prepare,
// } from 'react-native-iap';
// import {Platform, Alert} from 'react-native';
// import functions from '@react-native-firebase/functions';
// if (__DEV__) {
//   functions().useFunctionsEmulator('http://localhost:8081');
// }
// import {DataHandler} from '.';
// //import InAppBilling from "react-native-billing";
// import React from 'react';

// const successHandler = null;
// const validationHandler = null;

// const itemSkus = Platform.select({
//   ios: ['swingsubscription1'],
//   android: ['swingsubscription1'], //swingsubscription1 test
//   // android: ['android.test.purchased'], //swingsubscription1 test
// });

// let purchaseUpdateSubscription;
// let purchaseErrorSubscription;

// class InApp {
//   Init = async (callback) => {
//     this.validationHandler = callback;
//     // if (DataHandler.isIAPActive()) {
//     //   return;
//     // }
//     try {
//       const result = await RNIap.initConnection();
//       // consumePurchaseAndroid(purchase.purchaseToken);
//       console.log('Result: ', result);
//       // this.getProducts();
//       this.getSubscriptions();
//       callback && this.getPurchaseHistory(callback);
//       this.purchaseErrorHandler();
//       this.purchaseHandler();
//       DataHandler.setIAPTrue();
//     } catch (err) {
//       console.warn(err.code, err.message);
//       alert('Error: ' + err.message);
//     }
//   };

//   // initSub = async () => {
//   //   try {
//   //     const result = await RNIap.initConnection();
//   //     // consumePurchaseAndroid(purchase.purchaseToken);
//   //     console.log('Result initSub: ', result);
//   //     // this.getProducts();
//   //     // callback && this.getSubscriptions();
//   //     // callback && this.getPurchaseHistory(callback);
//   //     this.purchaseErrorHandler();
//   //     this.purchaseHandler();
//   //     DataHandler.setIAPTrue();
//   //   } catch (err) {
//   //     console.warn(err.code, err.message);
//   //     alert('Error: ' + err.message);
//   //   }
//   // };

//   async getSubscriptions() {
//     try {
//       const products: Product[] = await RNIap.getSubscriptions(itemSkus);
//       console.log('Get Subscriptions Done', products);
//     } catch (err) {
//       console.log('Get Subscription Error:  ', err); // standardized err.code and err.message available
//     }
//   }

//   requestSubscription = (sku, callback) => {
//     this.successHandler = callback;
//     try {
//       RNIap.requestSubscription('swingsubscription1', false);
//       console.log('purchasing Subscription');
//     } catch (err) {
//       alert('sorry');
//       console.warn(err.code, err.message);
//     }
//   };

//   purchaseHandler = async (callback) => {
//     console.log('I am purchase handler');

//     purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
//       console.log('I am purchase handler listener');

//       const receipt = purchase.transactionReceipt;
//       if (receipt) {
//         console.log('purchaseHandler receipt', receipt);
//         try {
//           if (Platform.OS === 'ios') {
//             console.log('Ios Purchase Done');
//             finishTransactionIOS(purchase.transactionId);
//             this.validate(receipt, callback);
//             // this.successHandler(true);
//           } else if (Platform.OS === 'android') {
//             consumePurchaseAndroid(purchase.purchaseToken);
//             //acknowledgePurchaseAndroid(purchase.purchaseToken);
//             this.successHandler(true);

//             const data = {
//               sku_id: 'swingsubscription1',
//               purchase_token: purchase.purchaseToken,
//               package_name: 'com.swing_trading_signals',
//             };

//             console.log('Success:  ', data);

//             functions()
//               .httpsCallable('', 'verifySubscription', {timeout: 10000})(data)
//               .then((response) => {
//                 console.log('firebase response', response);
//               })
//               .catch((err) => {
//                 console.log('firebase err', err);
//               });

//             // fetch(
//             //   'https://us-central1-forex-9f7ac.cloudfunctions.net/verifySubscription',
//             //   {
//             //     method: 'POST',
//             //     headers: {
//             //       Accept: 'application/json',
//             //       'Content-Type': 'multipart/form-data',
//             //     },
//             //     body: JSON.stringify({
//             //       data,
//             //     }),
//             //   },
//             // )
//             //   .then((res) => console.log(res, 'data'))
//             //   .catch((err) => console.log('wee', err));
//           }
//           const ackResult = await finishTransaction(purchase);
//         } catch (ackErr) {
//           this.successHandler(false);
//           console.warn('ackErr', ackErr);
//         }
//         //  this.setState({ receipt }, () => this.goNext());
//       }
//     });
//   };

//   async getPurchaseHistory(callback) {
//     const response = await RNIap.getPurchaseHistory();
//     const reciptt = response[response.length - 1].transactionReceipt;
//     console.log('=== reciptt ===', reciptt);
//     if (reciptt) {
//       this.validate(reciptt, callback);
//     }
//   }

//   validate = async (receipt, callback) => {
//     const recipttBody = {
//       'receipt-data': receipt,
//       password: '1656a531d7f740e5a7829703456b8baf',
//     };

//     //  ++++++++++++ VALIDATE WITH FIREBASE ++++++++++++
//     //
//     //
//     console.log('VALIDATE WITH FIREBASE');
//     await fetch(
//       'https://us-central1-forex-9f7ac.cloudfunctions.net/veriftySubscriptionIOS',
//       {
//         headers: {'Content-Type': 'application/json'},
//         method: 'POST',
//         body: JSON.stringify({data: recipttBody}),
//       },
//     )
//       .then((res) => {
//         res.json().then((data) => {
//           const expired = data.result.isExpired;
//           console.log('expired', expired);
//           if (!expired) {
//             console.log('Subscription -----> Not Expired');
//             // cb to send if user have validate purchase
//             this.successHandler === undefined
//               ? callback(true)
//               : this.successHandler(true);
//             // this.successHandler(true);
//             console.log('Subscription Not Expired');
//           } else {
//             console.log('Subscription -----> Expired');
//             // cb to send if user have no validate purchase
//             this.successHandler === undefined
//               ? callback(false)
//               : this.successHandler(false);
//           }
//         });
//       })
//       .catch((error) => {
//         console.log('error'), error;
//         this.successHandler === undefined
//           ? callback(false)
//           : this.successHandler(false);
//       });
//     //
//     //
//     //  ++++++++++++++++++++++++++++++++++++++++++++++++
//     //
//     //
//     //  ++++++++++++ VALIDATE WITHOUT FIREBASE ++++++++++++
//     //
//     //
//     // console.log('VALIDATE WITHOUT FIREBASE');
//     // await RNIap.validateReceiptIos(recipttBody, true)
//     //   .then((res) => {
//     //     console.log('validate', res);
//     //     try {
//     //       const renewalRecipt = res.latest_receipt_info;
//     //       const expiration =
//     //         renewalRecipt[renewalRecipt.length - 1].expires_date_ms;
//     //       console.log('expiration', expiration);
//     //       let expired = Date.now() > expiration;
//     //       console.log('expired', expired);
//     //       if (!expired) {
//     //         console.log('Subscription -----> Not Expired');
//     //         // cb to send if user have validate purchase
//     //         this.successHandler === undefined
//     //           ? callback(true)
//     //           : this.successHandler(true);
//     //         // this.successHandler(true);
//     //         console.log('Subscription Not Expired');
//     //       } else {
//     //         console.log('Subscription -----> Expired');
//     //         // cb to send if user have no validate purchase
//     //         this.successHandler === undefined
//     //           ? callback(false)
//     //           : this.successHandler(false);
//     //       }
//     //     } catch (error) {
//     //       console.log('not working', error);
//     //     }
//     //   })
//     //   .catch((err) => {
//     //     // if user is not sign in to apple account in app user will ask first to login if user cancel we will handle it here
//     //     console.log('err', err);
//     //   });
//     //
//     //
//     //  ++++++++++++++++++++++++++++++++++++++++++++++++
//   };

//   purchaseErrorHandler = async () => {
//     purchaseErrorSubscription = purchaseErrorListener(
//       (error: PurchaseError) => {
//         console.log('purchaseErrorListener', error);
//         console.log(
//           'this.successHandler purchaseErrorHandler',
//           this.successHandler,
//         );
//         if (error.responseCode === '2') {
//           Alert.alert(
//             'Subscrption purchase is canceled by you',
//             null,
//             [
//               {
//                 text: 'OK',
//                 onPress: () => this.successHandler(false),
//                 style: 'cancel',
//               },
//             ],
//             {cancelable: false},
//           );
//         } else {
//           Alert.alert(
//             'Something went wrong please try again.',
//             null,
//             [
//               {
//                 text: 'OK',
//                 onPress: () => this.successHandler(false),
//                 style: 'cancel',
//               },
//             ],
//             {cancelable: false},
//           );
//         }
//       },
//     );
//   };

//   remove() {
//     console.log('Unmounted');
//     if (purchaseUpdateSubscription) {
//       purchaseUpdateSubscription.remove();
//       purchaseUpdateSubscription = null;
//     }
//     if (purchaseErrorSubscription) {
//       purchaseErrorSubscription.remove();
//       purchaseErrorSubscription = null;
//     }
//   }
// }

// export default new InApp();
