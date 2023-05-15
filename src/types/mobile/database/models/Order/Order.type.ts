export type Order = {
  id: string;
  server_id: number;
  client_id: number;
  estimated_order_price: number;
  order_total_price: number;
  status: string;
};

export type OrderWithoutId = Omit<Order, 'id'>;
