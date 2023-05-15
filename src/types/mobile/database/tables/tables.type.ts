import { Tables } from './tables.enum';
import {
  Client,
  HistoricalProductPrice,
  Order,
  OrderItem,
  Product,
} from '../models';

export type Id = string;
export type Timestamp = number;
export type Raw = { id: Id };
export type TableChangeSet<T> = {
  created: T[];
  updated: T[];
  deleted: Id[];
};

export type TableTypes = {
  [Tables.Client]: Client;
  [Tables.HistoricalProductPrice]: HistoricalProductPrice;
  [Tables.OrderItems]: OrderItem;
  [Tables.Orders]: Order;
  [Tables.Products]: Product;
};

export type DatabaseChangeSetPrototype = {
  [table in Tables]: TableChangeSet<TableTypes[table]>;
};

export type DatabaseChangeSet = Partial<DatabaseChangeSetPrototype>;

export type SyncPullResult = {
  changes: DatabaseChangeSet;
  timestamp: Timestamp;
};

export type SyncPushResult = SyncPullResult;

export type SyncPullParams = {
  lastPulledAt: number;
  migration?: any;
  schemaVersion?: number;
};
export type SyncPushParams = {
  lastPulledAt: number;
};
