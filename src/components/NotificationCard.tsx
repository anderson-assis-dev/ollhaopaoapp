import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Notification } from '../types';

interface NotificationCardProps {
  notification: Notification;
  onPress: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);

    if (diff < 60) {
      return `há ${diff} min`;
    }
    if (diff < 1440) {
      return `há ${Math.floor(diff / 60)}h`;
    }
    return `há ${Math.floor(diff / 1440)}d`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        bg-white rounded-2xl p-4 mb-3
        ${!notification.read ? 'border-l-4 border-black' : ''}
      `}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-1">
        <Text className={`
          text-base flex-1
          ${!notification.read ? 'font-semibold' : 'font-normal'}
        `}>
          {notification.title}
        </Text>
        <Text className="text-xs text-gray-500 ml-2">
          {formatTime(notification.timestamp)}
        </Text>
      </View>
      <Text className="text-sm text-gray-600">
        {notification.message}
      </Text>
    </TouchableOpacity>
  );
};
