# Arquitetura do Projeto

## Organização de Código

O projeto foi estruturado seguindo os princípios SOLID e boas práticas de desenvolvimento React Native:

### Separação de Responsabilidades

1. **Components** - Componentes reutilizáveis e independentes
   - Cada componente tem uma única responsabilidade
   - Props bem definidas com TypeScript
   - Sem lógica de negócio, apenas apresentação

2. **Screens** - Telas da aplicação
   - Contêm a lógica específica da tela
   - Orquestram componentes menores
   - Gerenciam estado local quando necessário

3. **Icons** - Ícones SVG customizados
   - Componentes SVG reutilizáveis
   - Propriedades para tamanho e cor
   - Sem uso de emojis para ícones

4. **Services** - Dados e lógica de negócio
   - Dados mockados para desenvolvimento
   - Preparado para integração futura com APIs

5. **Types** - Definições de tipos TypeScript
   - Tipos compartilhados em toda aplicação
   - Garante type safety

6. **Navigation** - Controle de navegação
   - Gerenciamento centralizado de rotas
   - Estado de navegação tipado

## Princípios Aplicados

### Single Responsibility Principle (SRP)
Cada componente e função tem uma única responsabilidade:
- `Button` apenas renderiza um botão
- `Input` apenas renderiza um campo de entrada
- `BakeryCard` apenas mostra informações de uma padaria

### Open/Closed Principle (OCP)
Componentes são abertos para extensão via props:
- `Button` aceita diferentes variantes sem modificação
- `Icon` componentes aceitam tamanho e cor customizados

### Dependency Inversion Principle (DIP)
Screens dependem de abstrações (props/callbacks), não de implementações concretas:
- Callbacks para navegação
- Props para dados

## Padrões de Design

### Composition over Inheritance
Preferência por composição de componentes ao invés de herança.

### Container/Presentational Pattern
- Screens: containers com lógica
- Components: apresentação pura

### Props Drilling Controlled
Passagem de props controlada, preparado para Context API se necessário.

## Estilização

### NativeWind (Tailwind CSS)
- Classes utilitárias para estilização rápida
- Consistência visual em todo app
- Design system minimalista

### Design Principles
- Interface limpa e minimalista
- Inspirada em apps populares (WhatsApp, Instagram)
- Foco em usabilidade
- Feedback visual claro para interações

## State Management

Atualmente usando `useState` local por ser um projeto mockado.
Preparado para migração futura para:
- Context API para estado global
- React Query para cache de dados de API
- Zustand ou Redux para estado complexo

## Type Safety

TypeScript em todo projeto garantindo:
- Autocomplete no desenvolvimento
- Detecção de erros em tempo de compilação
- Documentação implícita via tipos
- Refatoração segura
