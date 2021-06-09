import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert, Platform} from 'react-native';
import {Notifications} from 'react-native-notifications';
import NavigationService from './NavigationService';
let localNotification;
let notifications;

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    //console.log("Authorization status:", authStatus);
  }
}

export function subscribeToTopic() {
  messaging()
    .subscribeToTopic('signals')
    .then(() => console.log('Subscribed to topic!'));
}

export function unubscribeToTopic() {
  messaging()
    .unsubscribeFromTopic('signals')
    .then(() => console.log('Unsubscribed to topic!'));
}

export async function getFcmToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (fcmToken) {
    setNotificationListeners();
  }
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
      setNotificationListeners();
    }
  }
}
function setNotificationListeners() {
  const chanelId = 'swing_schannel';
  notifications = messaging().onMessage(async (notification) => {
    console.log('notification', notification);
    localNotification = Notifications.postLocalNotification({
      title: notification.notification.title,
      // body: 'Local notification!',
      // sound: 'chime.aiff',
      // silent: false,
      // category: 'SOME_CATEGORY',
      // userInfo: {},
    });
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    NavigationService.navigate('Today Signal');
    console.log('remoteMessage background', remoteMessage);
  });

  // application is closed
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage !== undefined) {
        NavigationService.navigate('Today Signal');
      }
      console.log('remoteMessage closed', remoteMessage);
    });
}
export function cancelAllNotification() {
  if (Platform.OS === 'ios') {
    Notifications.ios.cancelAllLocalNotifications();
  }
}

// messaging().onMessage(async (notification) => {
//   console.log('notification', notification);
//   const localNotification = new firebase.notifications.Notification()
//     .setNotificationId(notification.notificationId)
//     .setTitle(notification.title)
//     .setBody(notification.body)
//     .setData(notification.data)
//     .setSound('default');

//   localNotification.ios = notification.ios;
//   localNotification.android = notification.android;

//   if (Platform.OS === 'android') {
//     const channel = new messaging.notifications.Android.Channel(
//       chanelId,
//       'Notifications',
//       messaging.notifications.Android.Importance.Max,
//     ).setDescription('Swings channel');

//     // Create the channel (android specific)
//     messaging.notifications().android.createChannel(channel);
//     localNotification.android.setChannelId(chanelId);
//     localNotification.android.setAutoCancel(true);
//     localNotification.android.setSmallIcon('ic_notification'); // name of the icon placed in android drawable or file name or url
//     // localNotification.android.setColor(Colors.accent);

//     // updateResetCount(data.notification_count);
//   } else {
//     localNotification.ios.setBadge(notification.ios.badge);
//   }
// });
