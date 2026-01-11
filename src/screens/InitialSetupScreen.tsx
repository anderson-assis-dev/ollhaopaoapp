import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../services/mockData';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

interface InitialSetupScreenProps {
  onComplete: () => void;
}

export const InitialSetupScreen: React.FC<InitialSetupScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'permissions' | 'favorites'>('permissions');
  const [locationGranted, setLocationGranted] = useState(false);
  const [notificationsGranted, setNotificationsGranted] = useState(false);
  const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);

  const handleRequestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationGranted(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da sua localização para mostrar padarias próximas');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível solicitar permissão de localização');
    }
  };

  const handleRequestNotifications = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      setNotificationsGranted(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos enviar notificações para avisar sobre fornadas');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível solicitar permissão de notificações');
    }
  };

  const handleContinue = () => {
    if (step === 'permissions') {
      setStep('favorites');
    } else {
      onComplete();
    }
  };

  const handleToggleFavorite = (productId: string) => {
    if (selectedFavorites.includes(productId)) {
      setSelectedFavorites(prev => prev.filter(id => id !== productId));
    } else if (selectedFavorites.length < 3) {
      setSelectedFavorites(prev => [...prev, productId]);
    }
  };

  const canContinue = step === 'permissions'
    ? locationGranted && notificationsGranted
    : selectedFavorites.length === 3;

  if (step === 'permissions') {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 justify-center">
          <View className="mb-12">
            <Text className="text-4xl font-bold mb-2">Configurar permissões</Text>
            <Text className="text-lg text-gray-600">
              Para oferecer a melhor experiência, precisamos de algumas permissões
            </Text>
          </View>

          <View className="mb-8">
            <TouchableOpacity
              onPress={handleRequestLocation}
              className={`
                p-6 rounded-2xl mb-4 border-2
                ${locationGranted ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200'}
              `}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xl font-semibold">Localização</Text>
                {locationGranted && (
                  <View className="bg-green-500 rounded-full px-3 py-1">
                    <Text className="text-white text-xs font-bold">Permitido</Text>
                  </View>
                )}
              </View>
              <Text className="text-sm text-gray-600">
                Para mostrar padarias próximas a você
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleRequestNotifications}
              className={`
                p-6 rounded-2xl border-2
                ${notificationsGranted ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-200'}
              `}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xl font-semibold">Notificações</Text>
                {notificationsGranted && (
                  <View className="bg-green-500 rounded-full px-3 py-1">
                    <Text className="text-white text-xs font-bold">Permitido</Text>
                  </View>
                )}
              </View>
              <Text className="text-sm text-gray-600">
                Para avisar quando o pão estiver saindo do forno
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Continuar"
            onPress={handleContinue}
            disabled={!canContinue}
            fullWidth
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="pt-8 mb-8">
          <Text className="text-4xl font-bold mb-2">Escolha seus favoritos</Text>
          <Text className="text-lg text-gray-600 mb-4">
            Selecione 3 produtos favoritos
          </Text>
          <View className="bg-gray-100 px-3 py-2 rounded-full self-start">
            <Text className="text-sm font-medium">
              {selectedFavorites.length} de 3 selecionados
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between mb-8">
          {mockProducts.map(product => (
            <TouchableOpacity
              key={product.id}
              onPress={() => handleToggleFavorite(product.id)}
              className={`
                bg-white rounded-2xl p-3 mb-4 w-[48%] border-2
                ${selectedFavorites.includes(product.id) ? 'border-black' : 'border-gray-200'}
              `}
              activeOpacity={0.7}
            >
              <View className="bg-gray-100 rounded-xl h-32 mb-2 items-center justify-center">
                <Text className="text-4xl">🥖</Text>
              </View>
              <Text className="text-sm font-semibold mb-1" numberOfLines={2}>
                {product.name}
              </Text>
              <Text className="text-base font-bold">
                R$ {product.price.toFixed(2)}
              </Text>
              {selectedFavorites.includes(product.id) && (
                <View className="absolute top-2 right-2 bg-black rounded-full w-6 h-6 items-center justify-center">
                  <Text className="text-white text-xs">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="px-6 py-4 bg-white border-t border-gray-200">
        <Button
          title="Começar"
          onPress={handleContinue}
          disabled={!canContinue}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};
