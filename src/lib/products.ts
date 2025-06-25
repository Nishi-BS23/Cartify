import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16-inch",
    price: 2499,
    originalPrice: 2799,
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop",
    rating: 4.8,
    reviewCount: 324,
    category: "Laptops",
    description: "Powerful laptop for professionals with M2 Pro chip",
    created: "2024-01-15T00:00:00.000Z",
    reviews: [
      {
        id: "r1",
        user: "John Doe",
        comment: "Great performance for coding!",
        rating: 5,
        date: "2025-06-01T10:00:00.000Z",
      },
      {
        id: "r2",
        user: "Jane Smith",
        comment: "Battery life is impressive.",
        rating: 4.5,
        date: "2025-06-10T14:00:00.000Z",
      },
    ],
    attributes: {
      condition: [
        { value: "New", quantity: 3 },
        { value: "Refurbished", quantity: 2 },
      ],
      color: [
        { value: "Space Gray", quantity: 2 },
        { value: "Silver", quantity: 3 },
      ],
    },
  },
  {
    id: "2",
    name: "Dell XPS 13",
    price: 1299,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=500&fit=crop",
    rating: 4.6,
    reviewCount: 189,
    category: "Laptops",
    description: "Ultra-portable laptop with stunning display",
    created: "2024-02-01T00:00:00.000Z",
    reviews: [
      {
        id: "r3",
        user: "Mike Wilson",
        comment: "Lightweight and fast!",
        rating: 4.5,
        date: "2025-06-05T09:00:00.000Z",
      },
    ],
    attributes: {
      condition: [{ value: "New", quantity: 8 }],
      color: [
        { value: "Silver", quantity: 5 },
        { value: "Black", quantity: 3 },
      ],
    },
  },
  {
    id: "3",
    name: "Gaming Mechanical Keyboard",
    price: 149,
    originalPrice: 199,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop",
    rating: 4.7,
    reviewCount: 567,
    category: "Accessories",
    description: "RGB mechanical keyboard with cherry MX switches",
    created: "2024-01-20T00:00:00.000Z",
    reviews: [
      {
        id: "r4",
        user: "Sarah Lee",
        comment: "Love the RGB lights!",
        rating: 4.8,
        date: "2025-06-03T12:00:00.000Z",
      },
    ],
    attributes: {
      switchType: [
        { value: "Cherry MX Red", quantity: 6 },
        { value: "Cherry MX Blue", quantity: 6 },
      ],
      color: [{ value: "Black", quantity: 12 }],
    },
  },
  {
    id: "4",
    name: "Wireless Mouse Pro",
    price: 79,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    rating: 4.5,
    reviewCount: 234,
    category: "Accessories",
    description: "Ergonomic wireless mouse with precision tracking",
    created: "2024-01-25T00:00:00.000Z",
    reviews: [
      {
        id: "r5",
        user: "Tom Brown",
        comment: "Comfortable for long use.",
        rating: 4.4,
        date: "2025-06-07T15:00:00.000Z",
      },
    ],
    attributes: {
      color: [
        { value: "Black", quantity: 8 },
        { value: "White", quantity: 7 },
      ],
    },
  },
  {
    id: "5",
    name: "4K Monitor 27-inch",
    price: 399,
    originalPrice: 499,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=500&h=500&fit=crop",
    rating: 4.9,
    reviewCount: 445,
    category: "Monitors",
    description: "Ultra HD 4K monitor with HDR support",
    created: "2024-02-10T00:00:00.000Z",
    reviews: [
      {
        id: "r6",
        user: "Emily Davis",
        comment: "Crystal clear display!",
        rating: 5,
        date: "2025-06-02T11:00:00.000Z",
      },
    ],
    attributes: {
      condition: [{ value: "New", quantity: 6 }],
      resolution: [{ value: "4K", quantity: 6 }],
    },
  },
  {
    id: "6",
    name: "Webcam HD Pro",
    price: 89,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?w=500&h=500&fit=crop",
    rating: 4.4,
    reviewCount: 156,
    category: "Accessories",
    description: "1080p HD webcam perfect for video calls",
    created: "2025-01-30T00:00:00.000Z",
    reviews: [
      {
        id: "r7",
        user: "Alex Turner",
        comment: "Good quality for the price.",
        rating: 4.3,
        date: "2025-06-09T13:00:00.000Z",
      },
    ],
    attributes: {
      resolution: [{ value: "1080p", quantity: 20 }],
    },
  },
  {
    id: "7",
    name: "Tablet Pro 12.9-inch",
    price: 1099,
    stock: 3,
    image:
      "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=500&h=500&fit=crop",
    rating: 4.7,
    reviewCount: 289,
    category: "Tablets",
    description: "Professional tablet with stylus support",
    created: "2024-02-05T00:00:00.000Z",
    reviews: [
      {
        id: "r8",
        user: "Laura Green",
        comment: "Perfect for sketching.",
        rating: 4.7,
        date: "2025-06-04T10:00:00.000Z",
      },
    ],
    attributes: {
      condition: [{ value: "New", quantity: 3 }],
      color: [{ value: "Space Gray", quantity: 3 }],
    },
  },
  {
    id: "8",
    name: "Bluetooth Headphones",
    price: 199,
    originalPrice: 249,
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    rating: 4.6,
    reviewCount: 678,
    category: "Audio",
    description: "Noise-canceling wireless headphones",
    created: "2024-01-18T00:00:00.000Z",
    reviews: [
      {
        id: "r9",
        user: "Chris Evans",
        comment: "Excellent sound quality.",
        rating: 4.6,
        date: "2025-06-06T16:00:00.000Z",
      },
    ],
    attributes: {
      color: [
        { value: "Black", quantity: 0 },
        { value: "White", quantity: 0 },
      ],
    },
  },
];
