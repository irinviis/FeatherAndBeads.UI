import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../../models/order.model';
import { IProduct } from '../../../models/product.model';
import { IUser } from '../../../models/user.model';
import { AccountService } from '../../services/account.service';
import { OrderService } from '../../services/order.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: IOrder[] = [];
  orderProducts: IProduct[] = [];
  user!: IUser;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(usr =>
      this.user = usr);
}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders(this.user.id).subscribe(orders => {
      this.orders = orders;
    })
  }

  getProductsForOrder(order: IOrder) {
    this.orderService.getProductsForOrder(order.id).subscribe(products => {
      this.orderProducts = products;
    })
  }
}
