import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ArrowLeftIcon } from '../icons';

interface RegisterScreenProps {
  onRegister: (phone: string) => void;
  onNavigateBack: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
  onNavigateBack,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegister(phone);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="px-6 pt-4 pb-2">
          <TouchableOpacity onPress={onNavigateBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="mb-8">
            <Text className="text-4xl font-bold mb-2">Criar conta</Text>
            <Text className="text-lg text-gray-600">
              Preencha seus dados para começar
            </Text>
          </View>

          <View className="mb-8">
            <Input
              label="Nome completo"
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
            />

            <Input
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Input
              label="Telefone"
              placeholder="(11) 99999-9999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <Input
              label="CPF"
              placeholder="000.000.000-00"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Input
              label="Confirmar senha"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            className="flex-row items-center mb-6"
            activeOpacity={0.7}
          >
            <View className={`
              w-5 h-5 rounded border-2 mr-3 items-center justify-center
              ${acceptedTerms ? 'bg-black border-black' : 'border-gray-300'}
            `}>
              {acceptedTerms && (
                <Text className="text-white text-xs">✓</Text>
              )}
            </View>
            <Text className="text-sm text-gray-600 flex-1">
              Aceito os <Text className="font-semibold text-black">termos de uso</Text> e a <Text className="font-semibold text-black">política de privacidade</Text>
            </Text>
          </TouchableOpacity>

          <Button
            title="Criar conta"
            onPress={handleRegister}
            loading={loading}
            disabled={!acceptedTerms}
            fullWidth
          />

          <View className="mt-6 mb-8 flex-row justify-center">
            <Text className="text-gray-600">Já tem uma conta? </Text>
            <Text
              onPress={onNavigateBack}
              className="font-semibold text-black"
            >
              Faça login
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
