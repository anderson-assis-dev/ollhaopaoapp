import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { mockProducts } from '../services/mockData';
import { CartItem } from '../types';
import { ArrowLeftIcon } from '../icons';
import { Button } from '../components/Button';

interface CartScreenProps {
  initialItems?: CartItem[];
  onNavigateBack: () => void;
  onNavigateToPayment: (items: CartItem[], total: number) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  initialItems = [],
  onNavigateBack,
  onNavigateToPayment,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const getProduct = (productId: string) => {
    return mockProducts.find(p => p.id === productId);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    onNavigateToPayment(cartItems, subtotal);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-4 pb-3 bg-white flex-row items-center">
        <TouchableOpacity onPress={onNavigateBack} activeOpacity={0.7}>
          <ArrowLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">Carrinho</Text>
      </View>

      {cartItems.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-6xl mb-4">🛒</Text>
          <Text className="text-xl font-semibold mb-2">Carrinho vazio</Text>
          <Text className="text-gray-600 text-center">
            Adicione produtos ao seu carrinho para continuar
          </Text>
        </View>
      ) : (
        <>
          <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
            {cartItems.map(item => {
              const product = getProduct(item.productId);
              if (!product) return null;

              const itemTotal = product.price * item.quantity;

              return (
                <View key={item.productId} className="bg-white rounded-2xl p-4 mb-3">
                  <View className="flex-row">
                    <Image
                      source={{ uri: product.image }}
                      className="w-20 h-20 rounded-xl mr-3"
                      resizeMode="cover"
                    />

                    <View className="flex-1">
                      <Text className="text-base font-semibold mb-1">
                        {product.name}
                      </Text>
                      <Text className="text-lg font-bold text-green-600 mb-2">
                        R$ {product.price.toFixed(2)}
                      </Text>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center bg-gray-50 rounded-full px-3 py-1">
                          <TouchableOpacity
                            onPress={() => handleUpdateQuantity(item.productId, -1)}
                            className="w-6 h-6 items-center justify-center"
                            activeOpacity={0.7}
                          >
                            <Text className="text-lg font-bold">-</Text>
                          </TouchableOpacity>

                          <Text className="text-base font-bold mx-3">{item.quantity}</Text>

                          <TouchableOpacity
                            onPress={() => handleUpdateQuantity(item.productId, 1)}
                            className="w-6 h-6 items-center justify-center"
                            activeOpacity={0.7}
                          >
                            <Text className="text-lg font-bold">+</Text>
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                          onPress={() => handleRemoveItem(item.productId)}
                          className="px-3 py-1"
                          activeOpacity={0.7}
                        >
                          <Text className="text-red-500 font-medium">Remover</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <Text className="text-gray-600">Subtotal</Text>
                    <Text className="text-base font-bold">R$ {itemTotal.toFixed(2)}</Text>
                  </View>
                </View>
              );
            })}

            <View className="bg-white rounded-2xl p-4 mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-600">Subtotal</Text>
                <Text className="font-medium">R$ {subtotal.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">Total</Text>
                <Text className="text-2xl font-bold">R$ {subtotal.toFixed(2)}</Text>
              </View>
            </View>
          </ScrollView>

          <View className="bg-white px-6 py-4 border-t border-gray-200">
            <Button
              title="Finalizar compra"
              onPress={handleCheckout}
              fullWidth
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
