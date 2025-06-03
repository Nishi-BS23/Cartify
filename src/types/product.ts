export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  created: string;
}
