import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Bakery } from '../types';
import { HeartIcon, MapPinIcon } from '../icons';

interface BakeryCardProps {
  bakery: Bakery;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export const BakeryCard: React.FC<BakeryCardProps> = ({
  bakery,
  onPress,
  onToggleFavorite,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl mb-4 overflow-hidden"
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: bakery.image }}
        className="w-full h-48"
        resizeMode="cover"
      />

      <TouchableOpacity
        onPress={onToggleFavorite}
        className="absolute top-4 right-4 bg-white rounded-full p-2"
        activeOpacity={0.7}
      >
        <HeartIcon
          size={20}
          color={bakery.isFavorite ? '#EF4444' : '#000'}
          filled={bakery.isFavorite}
        />
      </TouchableOpacity>

      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-lg font-semibold flex-1">{bakery.name}</Text>
          <View className={`
            px-2 py-1 rounded-full
            ${bakery.isOpen ? 'bg-green-100' : 'bg-gray-100'}
          `}>
            <Text className={`
              text-xs font-medium
              ${bakery.isOpen ? 'text-green-700' : 'text-gray-700'}
            `}>
              {bakery.isOpen ? 'Aberto' : 'Fechado'}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mb-2">
          <MapPinIcon size={14} color="#6B7280" />
          <Text className="text-sm text-gray-600 ml-1">{bakery.address}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-gray-500">{bakery.distance}</Text>
          <View className="flex-row items-center">
            <Text className="text-sm font-medium mr-1">⭐</Text>
            <Text className="text-sm font-medium">{bakery.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
