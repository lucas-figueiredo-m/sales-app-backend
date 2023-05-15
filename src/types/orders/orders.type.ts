import { Client, OrderItems, Orders } from '@prisma/client';

export type CreateOrderProductType = {
  product_id: number;
  negotiated_price: number;
  ordered_weight_in_grams: number;
  notes?: string;
};

export type UpdateOrderProductType = {
  server_id?: number;
  id?: string;
  notes?: string;
  product_id: number;
  negotiated_price: number;
  ordered_weight_in_grams: number;
};

export type CreateOrderType = {
  client_id: number;
  products: CreateOrderProductType[];
};

export type UpdateOrderType = {
  products: UpdateOrderProductType[];
};

export type OrderData = Orders & { order_items: OrderItems[]; client: Client };

export type ProcessedOrderDataType = UpdateOrderProductType & {
  table_price: number;
  estimated_product_total_price: number;
};
