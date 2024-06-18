// backend-notifications.js
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const messaging = getMessaging();

export const sendNotification = async (token, message) => {
  // This function needs to be implemented server-side to send notifications.
  // You might use Firebase Cloud Functions or another backend service.
  // For example:
  // await fetch('https://fcm.googleapis.com/fcm/send', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'key=YOUR_SERVER_KEY',
  //   },
  //   body: JSON.stringify({
  //     to: token,
  //     notification: {
  //       title: message.title,
  //       body: message.body,
  //     },
  //   }),
  // });
};

export const requestNotificationPermission = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
    if (currentToken) {
      console.log('Got FCM device token:', currentToken);
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
