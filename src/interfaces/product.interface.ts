// src/interfaces/product.interface.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  msrp?: number;
  thumbnailImageUrl: string;
}
