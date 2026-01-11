import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import {
  registerForPushNotifications,
  addNotificationReceivedListener,
  addNotificationResponseListener,
} from '../services/pushNotifications';

export const usePushNotifications = () => {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotifications();

    notificationListener.current = addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    responseListener.current = addNotificationResponseListener((response) => {
      console.log('Notification tapped:', response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
};
