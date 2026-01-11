import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { mockProducts } from '../services/mockData';
import { ArrowLeftIcon } from '../icons';
import { Button } from '../components/Button';

interface ReservationScreenProps {
  productId: string;
  onNavigateBack: () => void;
  onNavigateToPayment: (productId: string, quantity: number, total: number) => void;
}

export const ReservationScreen: React.FC<ReservationScreenProps> = ({
  productId,
  onNavigateBack,
  onNavigateToPayment,
}) => {
  const product = mockProducts.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  const total = product.price * quantity;

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleReserve = () => {
    onNavigateToPayment(productId, quantity, total);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-4 pb-3 bg-white flex-row items-center">
        <TouchableOpacity onPress={onNavigateBack} activeOpacity={0.7}>
          <ArrowLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">Reservar</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-white p-6 mb-4">
          <Image
            source={{ uri: product.image }}
            className="w-full h-64 rounded-2xl mb-4"
            resizeMode="cover"
          />

          <Text className="text-2xl font-bold mb-2">{product.name}</Text>
          <Text className="text-3xl font-bold text-green-600 mb-4">
            R$ {product.price.toFixed(2)}
          </Text>

          <View className="bg-gray-50 p-4 rounded-xl">
            <Text className="text-sm text-gray-600 mb-2">
              Produto fresco, direto do forno da padaria.
            </Text>
            <Text className="text-sm text-gray-600">
              Reserve agora e garanta sua unidade!
            </Text>
          </View>
        </View>

        <View className="bg-white p-6 mb-4">
          <Text className="text-lg font-semibold mb-4">Quantidade</Text>

          <View className="flex-row items-center justify-between bg-gray-50 rounded-2xl p-4">
            <TouchableOpacity
              onPress={handleDecrement}
              className="bg-white rounded-full w-12 h-12 items-center justify-center"
              activeOpacity={0.7}
              disabled={quantity === 1}
            >
              <Text className={`text-2xl font-bold ${quantity === 1 ? 'text-gray-300' : 'text-black'}`}>
                -
              </Text>
            </TouchableOpacity>

            <Text className="text-2xl font-bold">{quantity}</Text>

            <TouchableOpacity
              onPress={handleIncrement}
              className="bg-white rounded-full w-12 h-12 items-center justify-center"
              activeOpacity={0.7}
            >
              <Text className="text-2xl font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white p-6 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">Subtotal</Text>
            <Text className="font-medium">R$ {total.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold">Total</Text>
            <Text className="text-2xl font-bold">R$ {total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View className="bg-white px-6 py-4 border-t border-gray-200">
        <Button
          title="Continuar para pagamento"
          onPress={handleReserve}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};
