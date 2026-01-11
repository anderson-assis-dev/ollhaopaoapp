import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-black';
      case 'secondary':
        return 'bg-gray-200';
      case 'outline':
        return 'bg-transparent border border-black';
      default:
        return 'bg-black';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-white';
      case 'secondary':
        return 'text-black';
      case 'outline':
        return 'text-black';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        px-6 py-4 rounded-full items-center justify-center
        ${getVariantStyles()}
        ${disabled ? 'opacity-50' : 'opacity-100'}
        ${fullWidth ? 'w-full' : ''}
      `}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : 'black'} />
      ) : (
        <Text className={`font-semibold text-base ${getTextStyles()}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
