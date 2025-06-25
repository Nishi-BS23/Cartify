export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // Optional, for discounted items
  stock: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  created: string;
  reviews?: {
    id: string;
    user: string;
    comment: string;
    rating: number;
    date: string;
  }[];
  attributes?: {
    [key: string]: {
      value: string;
      quantity: number;
    }[];
  };
}
