import React, { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { BakeryDetailScreen } from '../screens/BakeryDetailScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ReservationScreen } from '../screens/ReservationScreen';
import { PaymentScreen } from '../screens/PaymentScreen';

type Screen =
  | 'onboarding'
  | 'login'
  | 'register'
  | 'smsVerification'
  | 'initialSetup'
  | 'home'
  | 'bakeryDetail'
  | 'notifications'
  | 'reservation'
  | 'payment';

interface NavigationState {
  screen: Screen;
  params?: {
    bakeryId?: string;
    productId?: string;
    quantity?: number;
    total?: number;
  };
}

export const AppNavigator: React.FC = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    screen: 'onboarding',
  });

  const navigate = (screen: Screen, params?: NavigationState['params']) => {
    setNavigationState({ screen, params });
  };

  const handleOpenGPS = () => {
    const url = 'https://maps.google.com/?q=padaria';
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o GPS');
    });
  };

  const handlePaymentConfirmation = () => {
    Alert.alert(
      'Pagamento Confirmado!',
      'Sua reserva foi confirmada com sucesso. Retire seu pedido na padaria em até 30 minutos.',
      [
        {
          text: 'OK',
          onPress: () => navigate('home'),
        },
      ]
    );
  };

  const renderScreen = () => {
    switch (navigationState.screen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={() => navigate('home')}
            onNavigateToRegister={() => navigate('register')}
          />
        );

      case 'register':
        return (
          <RegisterScreen
            onRegister={() => navigate('home')}
            onNavigateBack={() => navigate('login')}
          />
        );

      case 'home':
        return (
          <HomeScreen
            onSelectBakery={(bakeryId) => navigate('bakeryDetail', { bakeryId })}
            onNavigateToNotifications={() => navigate('notifications')}
          />
        );

      case 'bakeryDetail':
        return (
          <BakeryDetailScreen
            bakeryId={navigationState.params?.bakeryId || ''}
            onNavigateBack={() => navigate('home')}
            onNavigateToReservation={(productId) => navigate('reservation', { productId })}
            onOpenGPS={handleOpenGPS}
          />
        );

      case 'notifications':
        return (
          <NotificationsScreen
            onNavigateBack={() => navigate('home')}
            onSelectNotification={() => {}}
          />
        );

      case 'reservation':
        return (
          <ReservationScreen
            productId={navigationState.params?.productId || ''}
            onNavigateBack={() => navigate('bakeryDetail', { bakeryId: navigationState.params?.bakeryId })}
            onNavigateToPayment={(productId, quantity, total) =>
              navigate('payment', { productId, quantity, total })
            }
          />
        );

      case 'payment':
        return (
          <PaymentScreen
            total={navigationState.params?.total || 0}
            onNavigateBack={() => navigate('reservation', { productId: navigationState.params?.productId })}
            onConfirmPayment={handlePaymentConfirmation}
          />
        );

      case 'onboarding':
        return (
          <OnboardingScreen
            onComplete={() => navigate('login')}
          />
        );

      default:
        return null;
    }
  };

  return renderScreen();
};
