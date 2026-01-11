# Olha o Pão - App

Aplicativo React Native para acompanhamento de fornadas de padarias em tempo real com sistema de cashback e gamificação.

## Tecnologias

- React Native (Expo)
- TypeScript
- NativeWind (Tailwind CSS)
- React Native SVG
- Expo Camera (QR Code Scanner)
- Expo Location
- Expo Notifications (Push Notifications)

## Funcionalidades Implementadas

### Autenticação & Onboarding
- Onboarding com 3 telas interativas (swipe)
- Login e Cadastro completo (nome, email, telefone, CPF)
- Verificação por SMS (6 dígitos)
- Aceite de termos de uso
- Configuração inicial de permissões (localização e notificações)
- Seleção de 3 produtos favoritos

### Descoberta & Navegação
- Listagem de padarias próximas com geolocalização
- Filtros: "Todas" e "Favoritas"
- Sistema de favoritos
- Detalhes da padaria com status de fornadas em tempo real
- Integração com GPS para navegação ("Ir agora")

### Compra & Pagamento
- Scanner QR Code para identificar padaria
- Carrinho de compras com múltiplos produtos
- Controle de quantidade (+/-)
- Múltiplos métodos de pagamento (crédito, débito, PIX)
- Cálculo automático de totais

### Recompensas & Gamificação
- Sistema de Cashback (5% de volta)
- Acúmulo de Pontos (10 pontos por R$ 1,00)
- Badges e conquistas ("Primeira Compra")
- Compartilhamento de badges no WhatsApp

### Engajamento
- Sistema de avaliação (1-5 estrelas)
- Comentários sobre a experiência
- Push Notifications para fornadas prontas
- Badge de contador de notificações não lidas

### Tempo Real
- Status de fornadas:
  - Verde: Pronto agora
  - Amarelo: Saindo em X minutos
  - Azul: Em preparação (X minutos)

## Instalação

```bash
npm install
```

## Executar o projeto

```bash
npm start
```

Após executar, você pode:
- Pressionar `i` para abrir no simulador iOS
- Pressionar `a` para abrir no simulador Android
- Escanear o QR Code com o app Expo Go no seu celular

## Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
├── screens/         # Telas do aplicativo
├── icons/           # Ícones SVG customizados
├── navigation/      # Configuração de navegação
├── services/        # Dados mockados e serviços
├── types/           # Definições de tipos TypeScript
└── constants/       # Constantes da aplicação
```

## Telas Disponíveis (15 telas)

1. **Onboarding** - 3 telas com swipe explicando o app
2. **Login** - Autenticação do usuário
3. **Cadastro** - Criação de nova conta com CPF
4. **Verificação SMS** - Validação de telefone
5. **Configuração Inicial** - Permissões + escolha de favoritos
6. **Home** - Lista de padarias com filtros
7. **Detalhes da Padaria** - Status de fornadas e produtos
8. **Notificações** - Histórico de notificações
9. **Scanner QR Code** - Escanear QR da padaria
10. **Carrinho** - Produtos selecionados
11. **Reserva** - Seleção de produto individual
12. **Pagamento** - Seleção de método e confirmação
13. **Confirmação de Compra** - Sucesso com cashback e pontos
14. **Avaliação** - Rating e comentário
15. **Badge Desbloqueado** - Conquista com compartilhamento

## Princípios Aplicados

- Componentização
- Separação de responsabilidades (SOLID)
- Tipagem estrita com TypeScript
- Interface minimalista inspirada em WhatsApp/Instagram
- Componentes reutilizáveis sem duplicação de código
