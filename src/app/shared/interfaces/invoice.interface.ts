import { LineItem } from './line-item.interface';

export interface Invoice {
  userName: string;
  LineItem: LineItem[];
  partsAmount: number;
  laborAmount: number;
  lineItemTotal: number;
  total: number;
  orderDate: Date;
}
