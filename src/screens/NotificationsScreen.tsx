import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NotificationCard } from '../components/NotificationCard';
import { mockNotifications } from '../services/mockData';
import { ArrowLeftIcon } from '../icons';

interface NotificationsScreenProps {
  onNavigateBack: () => void;
  onSelectNotification: (notificationId: string) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onNavigateBack,
  onSelectNotification,
}) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleNotificationPress = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    onSelectNotification(notificationId);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-4 pb-3 bg-white">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={onNavigateBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold ml-4">Notificações</Text>
        </View>

        {unreadCount > 0 && (
          <View className="bg-gray-100 px-3 py-2 rounded-lg">
            <Text className="text-sm text-gray-700">
              {unreadCount} {unreadCount === 1 ? 'nova notificação' : 'novas notificações'}
            </Text>
          </View>
        )}
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {notifications.map(notification => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onPress={() => handleNotificationPress(notification.id)}
          />
        ))}

        {notifications.length === 0 && (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-center">
              Nenhuma notificação
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
