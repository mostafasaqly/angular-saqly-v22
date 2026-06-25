// models/product.model.ts
// TypeScript interfaces for the E-Commerce Mini App

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  summary: CartSummary;
  shippingInfo: Omit<CheckoutFormData, 'cardNumber' | 'cardExpiry' | 'cardCvc'>;
  placedAt: string;
}
