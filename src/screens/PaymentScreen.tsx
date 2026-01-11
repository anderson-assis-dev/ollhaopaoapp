import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeftIcon, CreditCardIcon, CheckIcon } from '../icons';
import { Button } from '../components/Button';
import { PaymentMethod } from '../types';

interface PaymentScreenProps {
  total: number;
  onNavigateBack: () => void;
  onConfirmPayment: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  total,
  onNavigateBack,
  onConfirmPayment,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('credit');
  const [loading, setLoading] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    { id: 'credit', type: 'credit', lastDigits: '1234', brand: 'Visa' },
    { id: 'debit', type: 'debit', lastDigits: '5678', brand: 'Mastercard' },
    { id: 'pix', type: 'pix' },
  ];

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirmPayment();
    }, 2000);
  };

  const getMethodLabel = (method: PaymentMethod) => {
    switch (method.type) {
      case 'credit':
        return `Cartão de Crédito •••• ${method.lastDigits}`;
      case 'debit':
        return `Cartão de Débito •••• ${method.lastDigits}`;
      case 'pix':
        return 'PIX';
      default:
        return 'Outro';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-4 pb-3 bg-white flex-row items-center">
        <TouchableOpacity onPress={onNavigateBack} activeOpacity={0.7}>
          <ArrowLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4">Pagamento</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-white p-6 mb-4 mt-4 mx-6 rounded-2xl">
          <Text className="text-sm text-gray-600 mb-2">Total a pagar</Text>
          <Text className="text-4xl font-bold">R$ {total.toFixed(2)}</Text>
        </View>

        <View className="px-6 mb-4">
          <Text className="text-lg font-semibold mb-4">
            Forma de pagamento
          </Text>

          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedMethod(method.id)}
              className={`
                bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between
                ${selectedMethod === method.id ? 'border-2 border-black' : 'border border-gray-200'}
              `}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center flex-1">
                <View className="bg-gray-100 rounded-full p-2 mr-3">
                  <CreditCardIcon size={20} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium">{getMethodLabel(method)}</Text>
                  {method.brand && (
                    <Text className="text-sm text-gray-500">{method.brand}</Text>
                  )}
                </View>
              </View>

              {selectedMethod === method.id && (
                <View className="bg-black rounded-full p-1">
                  <CheckIcon size={16} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="bg-gray-50 rounded-2xl p-4 items-center justify-center border border-dashed border-gray-300"
            activeOpacity={0.7}
          >
            <Text className="font-medium text-gray-700">
              + Adicionar novo método
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-6 mb-6">
          <View className="bg-blue-50 rounded-2xl p-4">
            <Text className="text-sm text-blue-800 font-medium mb-1">
              Reserva garantida
            </Text>
            <Text className="text-sm text-blue-700">
              Seu pedido ficará reservado por 30 minutos após a confirmação
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="bg-white px-6 py-4 border-t border-gray-200">
        <Button
          title="Confirmar pagamento"
          onPress={handlePayment}
          loading={loading}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};
