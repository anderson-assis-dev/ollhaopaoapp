import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '../components/Button';
import { ArrowLeftIcon } from '../icons';

interface SmsVerificationScreenProps {
  phone: string;
  onVerify: () => void;
  onNavigateBack: () => void;
}

export const SmsVerificationScreen: React.FC<SmsVerificationScreenProps> = ({
  phone,
  onVerify,
  onNavigateBack,
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.slice(-1);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerify();
    }, 1500);
  };

  const handleResend = () => {
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4 pb-2">
        <TouchableOpacity onPress={onNavigateBack} activeOpacity={0.7}>
          <ArrowLeftIcon size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6 justify-center">
        <View className="mb-12">
          <Text className="text-4xl font-bold mb-2">Verificação</Text>
          <Text className="text-lg text-gray-600">
            Digite o código enviado para
          </Text>
          <Text className="text-lg font-medium text-black">{phone}</Text>
        </View>

        <View className="flex-row justify-between mb-8">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={1}
              className="w-12 h-14 bg-gray-50 rounded-xl text-center text-2xl font-bold border border-gray-200"
              autoFocus={index === 0}
            />
          ))}
        </View>

        <Button
          title="Verificar"
          onPress={handleVerify}
          loading={loading}
          disabled={!isCodeComplete}
          fullWidth
        />

        <View className="mt-6 items-center">
          <Text className="text-gray-600 mb-2">Não recebeu o código?</Text>
          <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
            <Text className="font-semibold text-black">Reenviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
