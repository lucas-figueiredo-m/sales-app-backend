export type HistoricalProductPrice = {
  id: string;
  server_id: number;
  product_id: number;
  price: number;
};

export type HistoricalProductPriceWithoutId = Omit<
  HistoricalProductPrice,
  'id'
>;
