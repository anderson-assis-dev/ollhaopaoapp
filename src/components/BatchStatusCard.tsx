import React from 'react';
import { View, Text } from 'react-native';
import { BatchStatus } from '../types';
import { ClockIcon } from '../icons';

interface BatchStatusCardProps {
  batch: BatchStatus;
}

export const BatchStatusCard: React.FC<BatchStatusCardProps> = ({ batch }) => {
  const getStatusColor = () => {
    switch (batch.status) {
      case 'ready':
        return 'bg-green-100';
      case 'baking':
        return 'bg-yellow-100';
      case 'preparation':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusTextColor = () => {
    switch (batch.status) {
      case 'ready':
        return 'text-green-700';
      case 'baking':
        return 'text-yellow-700';
      case 'preparation':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  const getStatusText = () => {
    switch (batch.status) {
      case 'ready':
        return 'Pronto';
      case 'baking':
        return `Saindo em ${batch.timeRemaining} min`;
      case 'preparation':
        return `Preparando - ${batch.timeRemaining} min`;
      default:
        return 'Aguardando';
    }
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold mb-2">
            {batch.productName}
          </Text>
          <View className={`
            self-start px-3 py-1.5 rounded-full flex-row items-center
            ${getStatusColor()}
          `}>
            <ClockIcon size={14} color={getStatusTextColor().replace('text-', '#')} />
            <Text className={`text-sm font-medium ml-1 ${getStatusTextColor()}`}>
              {getStatusText()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
