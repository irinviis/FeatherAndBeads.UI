import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: IProduct[] = [];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.HasUpdates.subscribe(() => {
      this.getProducts();
    });
    this.getProducts();
  }

  getProducts() {
    this.products = this.cartService.getProducts();
  }

  getCartPrice() {
    return this.cartService.CalculatePrice();
  }

  updateProductQuantity(product: IProduct) {
    this.cartService.updateProductQuantity(product);
  }

  removeProduct(product: IProduct) {
    this.cartService.removeProduct(product);
  }
}
