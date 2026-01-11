export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Bakery {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  image: string;
  isOpen: boolean;
  isFavorite: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  bakeryId: string;
}

export interface BatchStatus {
  id: string;
  productName: string;
  status: 'preparation' | 'baking' | 'ready';
  timeRemaining: number;
  bakeryId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  bakeryId: string;
}

export interface Reservation {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ready' | 'completed';
  createdAt: Date;
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'pix';
  lastDigits?: string;
  brand?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}
