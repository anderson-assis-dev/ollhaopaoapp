import { Bakery, Product, BatchStatus, Notification } from '../types';

export const mockBakeries: Bakery[] = [
  {
    id: '1',
    name: 'Padaria do Bairro',
    address: 'Rua das Flores, 123',
    distance: '0.5 km',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    isOpen: true,
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Pão Quente',
    address: 'Av. Principal, 456',
    distance: '1.2 km',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
    isOpen: true,
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Delícias da Manhã',
    address: 'Rua do Comércio, 789',
    distance: '2.0 km',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=600&fit=crop',
    isOpen: false,
    isFavorite: true,
  },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Pão Francês',
    price: 0.50,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop',
    bakeryId: '1',
  },
  {
    id: 'p2',
    name: 'Croissant',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
    bakeryId: '1',
  },
  {
    id: 'p3',
    name: 'Pão de Queijo',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400&h=400&fit=crop',
    bakeryId: '1',
  },
  {
    id: 'p4',
    name: 'Sonho',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1626787410298-f45484349322?w=400&h=400&fit=crop',
    bakeryId: '1',
  },
];

export const mockBatchStatus: BatchStatus[] = [
  {
    id: 'b1',
    productName: 'Pão Francês',
    status: 'baking',
    timeRemaining: 8,
    bakeryId: '1',
  },
  {
    id: 'b2',
    productName: 'Croissant',
    status: 'ready',
    timeRemaining: 0,
    bakeryId: '1',
  },
  {
    id: 'b3',
    productName: 'Pão de Queijo',
    status: 'preparation',
    timeRemaining: 15,
    bakeryId: '1',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Pão Francês Pronto!',
    message: 'Sua fornada favorita acabou de sair do forno',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    bakeryId: '1',
  },
  {
    id: 'n2',
    title: 'Croissant saindo em 10 minutos',
    message: 'A fornada de croissant está quase pronta',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    bakeryId: '1',
  },
  {
    id: 'n3',
    title: 'Reserva confirmada',
    message: 'Sua reserva de Pão de Queijo foi confirmada',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true,
    bakeryId: '1',
  },
];
