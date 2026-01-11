import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
}) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-2">
          {label}
        </Text>
      )}
      <TextInput
        className={`
          px-4 py-3 bg-gray-50 rounded-xl text-base
          ${error ? 'border border-red-500' : 'border border-transparent'}
        `}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {error && (
        <Text className="text-xs text-red-500 mt-1">{error}</Text>
      )}
    </View>
  );
};
