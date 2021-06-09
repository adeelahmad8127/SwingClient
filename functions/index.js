const functions = require('firebase-functions');
const admin = require('firebase-admin');
const key = require('./service-account-key.json');
const {google} = require('googleapis');
const {CallableContext} = require('firebase-functions/lib/providers/https');
const axios = require('axios');

admin.initializeApp(functions.config().firebase);

const authClient = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ['https://www.googleapis.com/auth/androidpublisher'],
});

const playDeveloperApiClient = google.androidpublisher({
  version: 'v3',
  auth: authClient,
});

// const data = JSON.stringify({
//   'receipt-data': d['receipt-data'],
//   password: d.password,
//   'exclude-old-transactions': true,
// });
// const result = await axios.post(
//   'https://sandbox.itunes.apple.com/verifyReceipt',
//   data,
// );
// const renewalRecipt = result.data.latest_receipt_info;
// const receiptData = renewalRecipt[renewalRecipt.length - 1];
// console.log(receiptData);
// const expiration = receiptData.expires_date_ms;
// console.log({expiration});

// const expired = Date.now() > expiration;
// console.log({date: Date.now});
// console.log(Date.now(), ' Date.now()');
// console.log({expiration});
// return {
//   isExpired: expired,
// };

exports.verifySubscriptionAndroid = functions.https.onCall(async (d) => {
  // JSON.stringify(
  const data = {
    subscriptionId: d.sku_id,
    token: d.purchase_token,
    packageName: d.package_name,
    subscription: true,
  };
  // );

  console.log(data);

  // const result = await axios.get(
  //   `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${data.packageName}/purchases/subscriptions/${data.subscriptionId}/tokens/${data.token}`,
  // );

  try {
    await authClient.authorize();
    const subscription = await playDeveloperApiClient.purchases.subscriptions.get(
      data,
    );

    console.log(subscription);

    if (subscription.status === 200) {
      console.log('Subscription verification successfuly!');
      const expired = Date.now() > parseInt(subscription.data.expiryTimeMillis);
      console.log(expired);
      // Subscription response is successful. subscription.data will return the subscription information.
      return {
        subscription: subscription.data,
      };
    }
  } catch (error) {
    console.log(error);
  }

  // This message is returned when there is no successful response from the subscription/purchase get call
  return {
    status: 500,
    message: 'Failed to verify subscription, Try again!',
  };
});

// exports.verifySubscription = functions.https.onRequest(async (req, res) => {
//   // const skuId = data.sku_id;
//   // const purchaseToken = data.purchase_token;
//   // const packageName = data.package_name;
//   const {data} = req.body;
//   const skuId = data.sku_id;
//   const purchaseToken = data.purchase_token;
//   const packageName = data.package_name;
//   console.log('request', JSON.stringify(data));
//   res.setHeader('Content-Type', 'application/json');
//   // res.status(200).json({data});

//   try {
//     await authClient.authorize();
//     const subscription = await playDeveloperApiClient.purchases.subscriptions.get(
//       {
//         packageName: packageName,
//         subscriptionId: skuId,
//         token: purchaseToken,
//       },
//     );

//     if (subscription.status === 200) {
//       console.log('Subscription verification successfuly!');

//       // Subscription response is successful. subscription.data will return the subscription information.
//       res.status(200).json({
//         message: 'Subscription verification successfuly!',
//         data,
//       });
//     }
//   } catch (error) {
//     // Logging error for debugging
//     console.log('error', error);

//     res.status(400).json({
//       status: 500,
//       message: 'Failed to verify subscription, Try again! subscription',
//     });
//   }

//   // This message is returned when there is no successful response from the subscription/purchase get call
//   res.status(500).json({
//     status: 400,
//     message: 'Failed to verify subscription, Try again!',
//   });
// });

// Notification when new signal get created

exports.sendPushNotificationOnSignalCreate = functions.database
  .ref('signals/{date}/{pairs}')
  .onCreate((event) => {
    const data = event._data;
    console.log('data', data);
    const message = {
      notification: {
        title: `${data.currency} - A New Signal is Available.`,
        // body: `${data.currency} - A New Signal is Available.`,
      },
      android: {
        notification: {
          sound: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
      topic: 'signals',
    };
    console.log('message', message);
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log('Notification sent successfully:', response);
        return true;
      })
      .catch((error) => {
        console.log('Notification sent failed:', error);
        return true;
      });

    return true;
  });

// Notification when a signal get updated

exports.sendPushNotificationOnSignalUpdate = functions.database
  .ref('signals/{date}/{pairs}')
  .onUpdate((change) => {
    console.log('event', change.after.val());
    const data = change.after.val();
    // console.log('data', data);
    const message = {
      notification: {
        title: `${data.currency} - ${data.status}.`,
        // body: `${data.currency} - A New Signal is Available.`,
      },
      android: {
        notification: {
          sound: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
      topic: 'signals',
    };
    console.log('message', message);
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log('Notification sent successfully:', response);
        return true;
      })
      .catch((error) => {
        console.log('Notification sent failed:', error);
        return true;
      });

    return true;
  });

// Notification to send welcome message to all user currently disable

// exports.sendPushNotification = functions.database
//   .ref('users/{userID}')
//   .onCreate((event) => {
//     const data = event._data;
//     console.log('data', data);
//     payload = {
//       notification: {
//         title: 'Welcome',
//         body: 'thank for installed our app',
//       },
//     };
//     console.log('payload', payload);
//     admin
//       .messaging()
//       .sendToDevice(data.notification_token, payload)
//       .then((response) => {
//         console.log('Notification sent successfully:', response);
//         return true;
//       })
//       .catch((error) => {
//         console.log('Notification sent failed:', error);
//         return true;
//       });

//     return true;
//   });

exports.veriftySubscriptionIOS = functions.https.onCall(async (d) => {
  const data = JSON.stringify({
    'receipt-data': d['receipt-data'],
    password: d.password,
    'exclude-old-transactions': true,
  });
  const live = await axios.post(
    'https://buy.itunes.apple.com/verifyReceipt',
    data,
  );
  console.log(live.data);
  // console.log(live.status);
  if (live.data.status === '21007') {
    const test = await axios.post(
      'https://sandbox.itunes.apple.com/verifyReceipt',
      data,
    );
    console.log(test);
    const renewalRecipt = test.data.latest_receipt_info;
    const receiptData = renewalRecipt[renewalRecipt.length - 1];
    console.log(receiptData);
    const expiration = receiptData.expires_date_ms;
    console.log({expiration});

    const expired = Date.now() > expiration;
    console.log({date: Date.now});
    console.log(Date.now(), ' Date.now()');
    console.log({expiration});
    return {
      isExpired: expired,
    };
  } else {
    const renewalRecipt = live.data.latest_receipt_info;
    const receiptData = renewalRecipt[renewalRecipt.length - 1];
    console.log(receiptData);
    const expiration = receiptData.expires_date_ms;
    console.log({expiration});
    const expired = Date.now() > expiration;
    console.log({date: Date.now});
    console.log(Date.now(), ' Date.now()');
    console.log({expiration});
    return {
      isExpired: expired,
    };
  }
});

// exports.veriftySubscriptionIOS = functions.https.onCall(async (d) => {
//   const data = JSON.stringify({
//     'receipt-data': d['receipt-data'],
//     password: d.password,
//     'exclude-old-transactions': true,
//   });
//   const result = await axios.post(
//     'https://sandbox.itunes.apple.com/verifyReceipt',
//     // 'https://buy.itunes.apple.com/verifyReceipt',
//     data,
//   );
//   const renewalRecipt = result.data.latest_receipt_info;
//   const receiptData = renewalRecipt[renewalRecipt.length - 1];
//   console.log(receiptData);
//   const expiration = receiptData.expires_date_ms;
//   console.log({expiration});

//   const expired = Date.now() > expiration;
//   console.log({date: Date.now});
//   console.log(Date.now(), ' Date.now()');
//   console.log({expiration});
//   return {
//     isExpired: expired,
//   };
// });

// firebase deploy --only functions:veriftySubscriptionIOS
