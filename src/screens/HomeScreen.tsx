import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { BakeryCard } from '../components/BakeryCard';
import { mockBakeries } from '../services/mockData';
import { BellIcon } from '../icons';

interface HomeScreenProps {
  onSelectBakery: (bakeryId: string) => void;
  onNavigateToNotifications: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectBakery,
  onNavigateToNotifications,
}) => {
  const [bakeries, setBakeries] = useState(mockBakeries);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  const handleToggleFavorite = (bakeryId: string) => {
    setBakeries(prev =>
      prev.map(b =>
        b.id === bakeryId ? { ...b, isFavorite: !b.isFavorite } : b
      )
    );
  };

  const filteredBakeries = filter === 'favorites'
    ? bakeries.filter(b => b.isFavorite)
    : bakeries;

  const unreadNotifications = 2;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-4 pb-3 bg-white">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-sm text-gray-600">Olá,</Text>
            <Text className="text-2xl font-bold">Bem-vindo!</Text>
          </View>
          <TouchableOpacity
            onPress={onNavigateToNotifications}
            className="relative"
            activeOpacity={0.7}
          >
            <BellIcon size={24} color="#000" />
            {unreadNotifications > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {unreadNotifications}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row">
          <TouchableOpacity
            onPress={() => setFilter('all')}
            className={`
              px-4 py-2 rounded-full mr-2
              ${filter === 'all' ? 'bg-black' : 'bg-gray-100'}
            `}
            activeOpacity={0.7}
          >
            <Text className={`
              font-medium
              ${filter === 'all' ? 'text-white' : 'text-gray-700'}
            `}>
              Todas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilter('favorites')}
            className={`
              px-4 py-2 rounded-full
              ${filter === 'favorites' ? 'bg-black' : 'bg-gray-100'}
            `}
            activeOpacity={0.7}
          >
            <Text className={`
              font-medium
              ${filter === 'favorites' ? 'text-white' : 'text-gray-700'}
            `}>
              Favoritas
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-semibold mb-4">
          Padarias próximas
        </Text>

        {filteredBakeries.map(bakery => (
          <BakeryCard
            key={bakery.id}
            bakery={bakery}
            onPress={() => onSelectBakery(bakery.id)}
            onToggleFavorite={() => handleToggleFavorite(bakery.id)}
          />
        ))}

        {filteredBakeries.length === 0 && (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-center">
              Nenhuma padaria encontrada
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
