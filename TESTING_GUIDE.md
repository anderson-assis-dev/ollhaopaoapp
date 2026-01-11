# Guia de Teste do App

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o projeto:
```bash
npm start
```

3. Escolha uma plataforma:
   - iOS: Pressione `i` (requer Mac + Xcode)
   - Android: Pressione `a` (requer Android Studio)
   - Expo Go: Escaneie o QR Code com o app Expo Go

## Fluxo de Teste

### 1. Autenticação
- Tela inicial mostra login
- Preencha qualquer email/senha (mockado)
- Clique em "Cadastre-se" para ver tela de registro
- Após login/cadastro, vai para a Home

### 2. Home
- Visualize lista de padarias próximas
- Veja distância, rating e status (aberto/fechado)
- Clique no ícone de coração para favoritar
- Use os filtros "Todas" e "Favoritas"
- Clique no sino para ver notificações (badge com contador)

### 3. Detalhes da Padaria
- Clique em qualquer padaria
- Veja status das fornadas em tempo real:
  - Verde: Pronto
  - Amarelo: Saindo em X min
  - Azul: Em preparação
- Clique em "Ir agora" para abrir GPS
- Role para ver produtos disponíveis
- Clique em um produto para reservar

### 4. Notificações
- Clique no sino na Home
- Veja notificações não lidas (borda preta)
- Clique em uma notificação para marcá-la como lida
- Observe o contador de não lidas no topo

### 5. Reserva
- Selecione um produto
- Use os botões +/- para ajustar quantidade
- Veja o total atualizar automaticamente
- Clique em "Continuar para pagamento"

### 6. Pagamento
- Escolha forma de pagamento
- Veja o total destacado
- Clique em "Confirmar pagamento"
- Veja alerta de confirmação
- Retorna para Home após confirmação

## Dados Mockados

### Padarias
- 3 padarias de exemplo
- Distâncias variadas
- Status aberto/fechado
- Algumas já favoritadas

### Produtos
- Pão Francês: R$ 0,50
- Croissant: R$ 8,50
- Pão de Queijo: R$ 3,00
- Sonho: R$ 6,00

### Status de Fornadas
- Pão Francês: Assando (8 min)
- Croissant: Pronto
- Pão de Queijo: Preparando (15 min)

### Notificações
- 2 não lidas
- 1 lida
- Timestamps variados

## Recursos para Testar

- Navegação entre telas
- Estados de loading
- Interações de toque
- Formulários
- Listas com scroll
- Filtros dinâmicos
- Estados visuais (favoritos, lido/não lido)
- Feedback visual de interações
- Responsividade dos componentes

## Observações

- Todos os dados são mockados
- Não há integração com backend ainda
- GPS abre URL do Google Maps
- Delays simulados em login/pagamento (1.5-2s)
