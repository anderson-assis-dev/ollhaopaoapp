import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BatchStatusCard } from '../components/BatchStatusCard';
import { ProductCard } from '../components/ProductCard';
import { mockBakeries, mockBatchStatus, mockProducts } from '../services/mockData';
import { ArrowLeftIcon, MapPinIcon } from '../icons';
import { Button } from '../components/Button';

interface BakeryDetailScreenProps {
  bakeryId: string;
  onNavigateBack: () => void;
  onNavigateToReservation: (productId: string) => void;
  onOpenGPS: () => void;
}

export const BakeryDetailScreen: React.FC<BakeryDetailScreenProps> = ({
  bakeryId,
  onNavigateBack,
  onNavigateToReservation,
  onOpenGPS,
}) => {
  const bakery = mockBakeries.find(b => b.id === bakeryId);
  const batches = mockBatchStatus.filter(b => b.bakeryId === bakeryId);
  const products = mockProducts.filter(p => p.bakeryId === bakeryId);

  if (!bakery) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="relative">
        <Image
          source={{ uri: bakery.image }}
          className="w-full h-64"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={onNavigateBack}
          className="absolute top-4 left-4 bg-white rounded-full p-2"
          activeOpacity={0.7}
        >
          <ArrowLeftIcon size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-white px-6 py-4 mb-4">
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <Text className="text-2xl font-bold mb-2">{bakery.name}</Text>
              <View className="flex-row items-center mb-2">
                <MapPinIcon size={16} color="#6B7280" />
                <Text className="text-sm text-gray-600 ml-1">
                  {bakery.address}
                </Text>
              </View>
              <Text className="text-sm text-gray-500">{bakery.distance}</Text>
            </View>
            <View className={`
              px-3 py-1.5 rounded-full
              ${bakery.isOpen ? 'bg-green-100' : 'bg-gray-100'}
            `}>
              <Text className={`
                text-sm font-medium
                ${bakery.isOpen ? 'text-green-700' : 'text-gray-700'}
              `}>
                {bakery.isOpen ? 'Aberto' : 'Fechado'}
              </Text>
            </View>
          </View>

          <Button
            title="Ir agora"
            onPress={onOpenGPS}
            variant="primary"
            fullWidth
          />
        </View>

        <View className="px-6 mb-4">
          <Text className="text-lg font-semibold mb-3">
            Status das fornadas
          </Text>
          {batches.map(batch => (
            <BatchStatusCard key={batch.id} batch={batch} />
          ))}
        </View>

        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold mb-3">
            Produtos disponíveis
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-6 px-6"
          >
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => onNavigateToReservation(product.id)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
