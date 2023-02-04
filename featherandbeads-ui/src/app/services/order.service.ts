import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IOrder } from '../../models/order.model';
import { IProduct } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getOrders(userId: number) {
    return this.http.get<IOrder[]>(this.baseUrl + `Order/GetOrders?userId=${userId}`);
  }

  getProductsForOrder(orderId: number) {
    return this.http.get<IProduct[]>(this.baseUrl + `Order/GetProductsForOrder?orderId=${orderId}`);
  }
}
