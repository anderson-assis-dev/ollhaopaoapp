import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-3 mr-3 w-36"
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: product.image }}
        className="w-full h-28 rounded-xl mb-2"
        resizeMode="cover"
      />
      <Text className="text-sm font-semibold mb-1" numberOfLines={2}>
        {product.name}
      </Text>
      <Text className="text-base font-bold">
        R$ {product.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};
