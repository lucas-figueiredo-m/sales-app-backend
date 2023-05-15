export type OrderItem = {
  id: string;
  server_id: number;
  order_id: number;
  product_id: number;
  table_price: number;
  negotiated_price: number;
  ordered_weight_in_grams: number;
  delivered_weight_in_grams: number;
  estimated_product_total_price: number;
  product_totalPrice: number;
  notes: string;
};

export type OrderItemWithoutId = Omit<OrderItem, 'id'>;
