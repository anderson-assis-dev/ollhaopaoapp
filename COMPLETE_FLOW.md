# Fluxo Completo do App - Olha o Pão

## Telas Implementadas

### 1. Onboarding (OnboardingScreen)
- 3 telas com swipe horizontal
- "Nunca mais perca o pão quentinho"
- "Ganhe cashback em cada compra"
- "Acumule pontos e troque por prêmios"
- Botão "Pular" e indicadores de progresso

### 2. Login (LoginScreen)
- Email e senha
- Link para cadastro
- Design minimalista

### 3. Cadastro (RegisterScreen)
- Nome completo
- Email
- Telefone
- CPF
- Senha e confirmação
- Checkbox de aceite de termos
- Botão desabilitado até aceitar termos

### 4. Verificação SMS (SmsVerificationScreen)
- 6 dígitos para código SMS
- Auto-foco nos campos
- Botão "Reenviar código"
- Validação automática

### 5. Configuração Inicial (InitialSetupScreen)
**Parte 1 - Permissões:**
- Solicitar permissão de localização
- Solicitar permissão de notificações
- Feedback visual de permissões concedidas

**Parte 2 - Favoritos:**
- Escolher 3 produtos favoritos
- Contador de seleção
- Grid de produtos

### 6. Home (HomeScreen)
- Lista de padarias próximas
- Filtros: "Todas" e "Favoritas"
- Botão de notificações com badge
- Cards com distância, rating e status

### 7. Detalhes da Padaria (BakeryDetailScreen)
- Imagem da padaria
- Status das fornadas em tempo real:
  - Verde: Pronto
  - Amarelo: Saindo em X min
  - Azul: Em preparação
- Botão "Ir agora" (abre GPS)
- Scroll horizontal de produtos

### 8. Scanner QR Code (QRScannerScreen)
- Câmera para escanear QR Code
- Quadrado de foco visual
- Permissão de câmera

### 9. Carrinho (CartScreen)
- Lista de produtos adicionados
- Controle de quantidade (+/-)
- Botão remover item
- Cálculo de subtotal e total
- Tela vazia com feedback

### 10. Reserva (ReservationScreen)
- Detalhes do produto
- Seleção de quantidade
- Visualização do total
- Botão para pagamento

### 11. Pagamento (PaymentScreen)
- Seleção de método de pagamento
- Cartão crédito/débito/PIX
- Total destacado
- Opção de adicionar novo método
- Aviso de reserva garantida

### 12. Confirmação de Compra (PurchaseConfirmationScreen)
- Ícone de sucesso
- Valor total
- Cashback ganho (destacado em verde)
- Pontos acumulados (destacado em azul)
- Prazo de retirada (30 min)
- Botão para avaliar

### 13. Avaliação (RatingScreen)
- Estrelas de 1 a 5
- Feedback textual do rating
- Campo de comentário opcional
- Botão "Pular"

### 14. Badge Desbloqueado (BadgeUnlockedScreen)
- Animação do badge
- Título e descrição
- Botão "Compartilhar no WhatsApp"
- Botão "Continuar"

### 15. Notificações (NotificationsScreen)
- Lista de notificações
- Marcação de lido/não lido
- Contador de não lidas
- Timeline com timestamps

## Fluxo de Navegação

```
Onboarding → Login → Cadastro → Verificação SMS → Setup Inicial → Home
                ↓
              Home ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
                ↓                                              ↑
          Detalhes Padaria → Scanner QR → Carrinho           ↑
                ↓                            ↓                ↑
          Produto/Reserva                   ↓                ↑
                ↓                            ↓                ↑
            Pagamento  ← ← ← ← ← ← ← ← ← ← ←                ↑
                ↓                                             ↑
        Confirmação Compra                                    ↑
                ↓                                             ↑
            Avaliação                                         ↑
                ↓                                             ↑
         Badge Desbloqueado  → → → → → → → → → → → → → → → →
```

## Funcionalidades Especiais

### Cashback
- Calculado automaticamente
- Exibido na confirmação de compra
- Visual destacado em verde

### Pontos
- Acumulados a cada compra
- Exibidos na confirmação
- Visual destacado em azul

### Badges
- Primeira Compra
- Compartilhamento no WhatsApp
- Visual comemorativo

### Push Notifications
- Avisos de fornadas prontas
- Notificações de cashback
- Lembretes de retirada

## Dados Mockados

### Padarias
- 3 padarias de exemplo
- Variedade de distâncias
- Status aberto/fechado

### Produtos
- Pão Francês: R$ 0,50
- Croissant: R$ 8,50
- Pão de Queijo: R$ 3,00
- Sonho: R$ 6,00

### Status de Fornadas
- Diferentes estados (preparação, assando, pronto)
- Tempos variados

### Cashback
- 5% do valor total da compra

### Pontos
- 10 pontos por cada R$ 1,00 gasto

## Próximos Passos (Backend)

1. Integração com API real
2. Firebase para notificações Android
3. Sistema de autenticação real
4. Gateway de pagamento
5. Geolocalização em tempo real
6. Sistema de pontos e recompensas
7. Histórico de compras
8. Perfil do usuário
