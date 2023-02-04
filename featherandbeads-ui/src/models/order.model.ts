export interface IOrder {
  id: number;
  orderNumber: string;
  orderDate: Date;
  cost: number;
  paid: boolean;
  deliveredDate: Date;
  userId: number;
}
