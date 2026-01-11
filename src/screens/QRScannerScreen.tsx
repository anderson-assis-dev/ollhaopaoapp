import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ArrowLeftIcon } from '../icons';
import { Button } from '../components/Button';

interface QRScannerScreenProps {
  onScanComplete: (data: string) => void;
  onNavigateBack: () => void;
}

export const QRScannerScreen: React.FC<QRScannerScreenProps> = ({
  onScanComplete,
  onNavigateBack,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    onScanComplete(data);
  };

  if (!permission) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-600">Carregando câmera...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 justify-center items-center">
          <Text className="text-2xl font-bold mb-4 text-center">
            Permissão de Câmera
          </Text>
          <Text className="text-lg text-gray-600 text-center mb-8">
            Precisamos da sua permissão para escanear o QR Code da padaria
          </Text>
          <Button title="Permitir câmera" onPress={requestPermission} fullWidth />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="absolute top-12 left-6 z-10">
        <TouchableOpacity
          onPress={onNavigateBack}
          className="bg-white rounded-full p-2"
          activeOpacity={0.7}
        >
          <ArrowLeftIcon size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />

      <View className="absolute bottom-0 left-0 right-0 bg-black/70 p-6">
        <View className="items-center mb-4">
          <View className="w-64 h-64 border-4 border-white rounded-2xl mb-6" />
        </View>
        <Text className="text-white text-center text-lg font-medium mb-2">
          Escaneie o QR Code da padaria
        </Text>
        <Text className="text-white/70 text-center">
          Posicione o QR Code dentro do quadrado
        </Text>
      </View>
    </SafeAreaView>
  );
};
