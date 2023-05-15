export enum ClientColumns {
  id = 'id',
  serverId = 'server_id',
  employeeId = 'employee_id',
  companyName = 'company_name',
  tradeName = 'trade_name',
  taxpayerId = 'taxpayer_id',
  type = 'type',
  buyerFirstName = 'buyer_first_name',
  buyerLastName = 'buyer_last_name',
  phone = 'phone',
  address = 'address',
  number = 'number',
  complement = 'complement',
  zipCode = 'zip_code',
  createdAt = 'created_at',
  updatedAt = 'updated_at',
  active = 'active',
}

export enum ProductColumns {
  serverId = 'server_id',
  name = 'name',
  price = 'price',
  category = 'category',
  type = 'type',
  createdAt = 'created_at',
  updatedAt = 'updated_at',
}

export enum HistoricalProductPriceColumns {
  serverId = 'server_id',
  productId = 'product_id',
  price = 'price',
  createdAt = 'created_at',
  updatedAt = 'updated_at',
}

export enum OrderColumns {
  serverId = 'server_id',
  clientId = 'client_id',
  status = 'status',
  estimatedOrderPrice = 'estimated_order_price',
  orderTotalPrice = 'order_total_price',
  createdAt = 'created_at',
  updatedAt = 'updated_at',
}

export enum OrderItemColumns {
  serverId = 'server_id',
  orderId = 'order_id',
  productId = 'product_id',
  tablePrice = 'table_price',
  negotiatedPrice = 'negotiated_price',
  orderedWeightInGrams = 'ordered_weight_in_grams',
  deliveredWeightInGrams = 'delivered_weight_in_grams',
  estimatedProductTotalPrice = 'estimated_product_total_price',
  productTotalPrice = 'product_total_price',
  notes = 'notes',
  createdAt = 'created_at',
  updatedAt = 'updated_at',
}
