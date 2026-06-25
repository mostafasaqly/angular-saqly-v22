// models/product.model.ts
// TypeScript interfaces for the Admin Dashboard project

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateDto {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  imageUrl?: string;
}

export interface ProductUpdateDto extends Partial<ProductCreateDto> {
  id: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalRevenue: number;
  totalOrders: number;
  activeUsers: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatarUrl?: string;
}

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}
