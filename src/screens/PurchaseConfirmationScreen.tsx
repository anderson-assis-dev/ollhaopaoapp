import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button } from '../components/Button';
import { CheckIcon } from '../icons';

interface PurchaseConfirmationScreenProps {
  total: number;
  cashbackAmount: number;
  pointsEarned: number;
  onContinue: () => void;
}

export const PurchaseConfirmationScreen: React.FC<PurchaseConfirmationScreenProps> = ({
  total,
  cashbackAmount,
  pointsEarned,
  onContinue,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6"
        contentContainerClassName="flex-1 justify-center items-center"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          <View className="bg-green-500 rounded-full w-24 h-24 items-center justify-center mb-6">
            <CheckIcon size={48} color="#FFF" />
          </View>

          <Text className="text-3xl font-bold mb-2 text-center">
            Compra confirmada!
          </Text>
          <Text className="text-lg text-gray-600 text-center">
            Seu pedido está pronto para retirada
          </Text>
        </View>

        <View className="w-full bg-gray-50 rounded-2xl p-6 mb-6">
          <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <Text className="text-gray-600">Valor total</Text>
            <Text className="text-2xl font-bold">R$ {total.toFixed(2)}</Text>
          </View>

          <View className="bg-green-50 rounded-xl p-4 mb-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm text-green-700 font-medium mb-1">
                  💰 Cashback ganho
                </Text>
                <Text className="text-xs text-green-600">
                  Você recebeu de volta
                </Text>
              </View>
              <Text className="text-2xl font-bold text-green-700">
                R$ {cashbackAmount.toFixed(2)}
              </Text>
            </View>
          </View>

          <View className="bg-blue-50 rounded-xl p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm text-blue-700 font-medium mb-1">
                  ⭐ Pontos acumulados
                </Text>
                <Text className="text-xs text-blue-600">
                  Use para trocar por prêmios
                </Text>
              </View>
              <Text className="text-2xl font-bold text-blue-700">
                +{pointsEarned}
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-200">
          <Text className="text-sm text-amber-800 font-medium mb-1">
            ⏰ Prazo de retirada
          </Text>
          <Text className="text-sm text-amber-700">
            Você tem 30 minutos para retirar seu pedido na padaria
          </Text>
        </View>

        <Button
          title="Avaliar experiência"
          onPress={onContinue}
          fullWidth
        />

        <Text className="text-gray-500 text-center mt-4 text-sm">
          Mostre este comprovante na padaria
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
