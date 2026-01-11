import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onNavigateToRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-6 justify-center">
          <View className="mb-12">
            <Text className="text-4xl font-bold mb-2">Bem-vindo</Text>
            <Text className="text-lg text-gray-600">
              Faça login para continuar
            </Text>
          </View>

          <View className="mb-8">
            <Input
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            fullWidth
          />

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600">Não tem uma conta? </Text>
            <Text
              onPress={onNavigateToRegister}
              className="font-semibold text-black"
            >
              Cadastre-se
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
