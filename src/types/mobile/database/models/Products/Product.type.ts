export type Product = {
  id: string;
  name: string;
  server_id: number;
  price: number;
  category: string;
  type: string;
};

export type ProductWithoutId = Omit<Product, 'id'>;
