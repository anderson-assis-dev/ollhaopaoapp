import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const registerForPushNotifications = async () => {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  try {
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push notification token:', token);
  } catch (error) {
    console.error('Error getting push token:', error);
  }

  return token;
};

export const scheduleBatchReadyNotification = async (
  productName: string,
  timeInMinutes: number
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${productName} saindo em ${timeInMinutes} minutos! 🔥`,
      body: 'Corra para garantir o seu quentinho!',
      data: { type: 'batch_ready', productName },
      sound: true,
    },
    trigger: {
      seconds: timeInMinutes * 60,
    },
  });
};

export const sendImmediateNotification = async (
  title: string,
  body: string,
  data?: Record<string, any>
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: null,
  });
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const addNotificationReceivedListener = (
  callback: (notification: Notifications.Notification) => void
) => {
  return Notifications.addNotificationReceivedListener(callback);
};

export const addNotificationResponseListener = (
  callback: (response: Notifications.NotificationResponse) => void
) => {
  return Notifications.addNotificationResponseReceivedListener(callback);
};
