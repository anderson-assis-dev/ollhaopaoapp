# Configuração de Push Notifications

## iOS

### Requisitos
1. Conta Apple Developer
2. Certificados APNs configurados
3. Expo CLI

### Configuração no app.json

Adicione as seguintes configurações no arquivo `app.json`:

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.seudominio.olhaopao",
      "buildNumber": "1.0.0",
      "supportsTablet": true
    },
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#000000",
      "androidMode": "default",
      "iosDisplayInForeground": true
    }
  }
}
```

### Testando no Desenvolvimento

1. Execute o app no simulador iOS:
```bash
npm run ios
```

2. As notificações funcionarão automaticamente no desenvolvimento através do Expo

3. Para testar notificações agendadas:
```typescript
import { scheduleBatchReadyNotification } from './src/services/pushNotifications';

// Agendar notificação para 5 minutos
scheduleBatchReadyNotification('Pão Francês', 5);
```

### Build para Produção

1. Crie um build usando EAS:
```bash
npm install -g eas-cli
eas build --platform ios
```

2. Configure os certificados APNs no console da Apple Developer

3. Upload para TestFlight ou App Store

## Android (Futuro)

Para Android, será necessário:
1. Firebase Cloud Messaging (FCM)
2. google-services.json
3. Configuração no app.json

```json
{
  "expo": {
    "android": {
      "package": "com.seudominio.olhaopao",
      "googleServicesFile": "./google-services.json",
      "permissions": [
        "RECEIVE_BOOT_COMPLETED"
      ]
    }
  }
}
```

## Tipos de Notificações Implementadas

### 1. Fornada Pronta
```typescript
await sendImmediateNotification(
  'Pão Francês saindo do forno! 🔥',
  'Corra para garantir o seu quentinho!'
);
```

### 2. Cashback Recebido
```typescript
await sendImmediateNotification(
  'Cashback creditado! 💰',
  'Você recebeu R$ 2,50 de volta na sua conta'
);
```

### 3. Pontos Acumulados
```typescript
await sendImmediateNotification(
  'Novos pontos! ⭐',
  'Você ganhou 100 pontos! Troque por prêmios'
);
```

### 4. Lembrete de Retirada
```typescript
await scheduleBatchReadyNotification(
  'Última chance!',
  'Seu pedido expira em 5 minutos'
);
```

## Gerenciamento de Notificações

### Remover tela de Notificações

A tela `NotificationsScreen` pode ser mantida para histórico, mas não deve ser a principal forma de ver notificações. As push notifications aparecem como:
- Banner no topo (iOS/Android)
- Badge no ícone do app
- Centro de notificações do sistema

### Usar o Hook

No componente principal do app:

```typescript
import { usePushNotifications } from './src/hooks/usePushNotifications';

function App() {
  usePushNotifications();

  return (
    <AppNavigator />
  );
}
```

## Testes

### Teste Manual
1. Abra o app
2. Permita notificações quando solicitado
3. Execute no console:
```typescript
import { sendImmediateNotification } from './src/services/pushNotifications';

sendImmediateNotification(
  'Teste',
  'Esta é uma notificação de teste'
);
```

### Teste de Agendamento
```typescript
import { scheduleBatchReadyNotification } from './src/services/pushNotifications';

// Notificação em 10 segundos
scheduleBatchReadyNotification('Teste', 0.16);
```

## Limitações do Expo Go

⚠️ No Expo Go, as notificações funcionam, mas com limitações:
- Não usa APNs real
- Usa servidor de desenvolvimento do Expo
- Para produção, é necessário fazer build standalone

## Próximos Passos

1. Implementar Firebase para Android
2. Criar sistema de preferências de notificações
3. Adicionar notificações rich (com imagens)
4. Implementar deep linking para abrir telas específicas ao tocar
5. Analytics de abertura de notificações
