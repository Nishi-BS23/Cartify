import { ProductWithVariant } from "@/types/productWithVarient";

export interface CartItem {
  product: ProductWithVariant;
  quantity: number;
}
