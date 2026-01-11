import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Share } from 'react-native';
import { Button } from '../components/Button';

interface BadgeUnlockedScreenProps {
  badgeTitle: string;
  badgeDescription: string;
  badgeIcon: string;
  onContinue: () => void;
}

export const BadgeUnlockedScreen: React.FC<BadgeUnlockedScreenProps> = ({
  badgeTitle,
  badgeDescription,
  badgeIcon,
  onContinue,
}) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎉 Acabei de conquistar o badge "${badgeTitle}" no Olha o Pão! Baixe o app e nunca mais perca o pão quentinho! 🥖`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-amber-50 to-white">
      <View className="flex-1 px-6 justify-center items-center">
        <View className="mb-8 items-center">
          <View className="relative">
            <View className="absolute -inset-4 bg-amber-200 rounded-full opacity-30 animate-pulse" />
            <View className="bg-white rounded-full w-32 h-32 items-center justify-center shadow-lg">
              <Text className="text-6xl">{badgeIcon}</Text>
            </View>
          </View>
        </View>

        <View className="items-center mb-12">
          <Text className="text-3xl font-bold mb-4 text-center">
            Parabéns! 🎉
          </Text>
          <View className="bg-amber-100 px-4 py-2 rounded-full mb-4">
            <Text className="text-amber-800 font-bold text-lg">
              {badgeTitle}
            </Text>
          </View>
          <Text className="text-base text-gray-600 text-center px-8">
            {badgeDescription}
          </Text>
        </View>

        <View className="w-full">
          <Button
            title="Compartilhar no WhatsApp"
            onPress={handleShare}
            variant="primary"
            fullWidth
          />

          <TouchableOpacity
            onPress={onContinue}
            className="mt-4 py-3"
            activeOpacity={0.7}
          >
            <Text className="text-center text-gray-600 font-medium">
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
