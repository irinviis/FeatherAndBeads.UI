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
  product!: IProduct;
  alert = false;
  alertMsg = "";

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

  getPriceTax() {
    return this.cartService.calculateTax();
  }

  getCartPrice() {
    return this.cartService.CalculatePrice();
  }

  updateProductQuantity(product: IProduct, increment: number) {
    product.cartQuantity += increment;
    this.cartService.updateProductQuantity(product);
    if (product.cartQuantity > product.quantity) {
      this.alert = true;
      this.alertMsg = (`Tuotetta ${product.name} on saatavilla enintään ${product.quantity} kpl`);
    }
    if (product.quantity === 0) {
      this.alert = true;
      this.alertMsg = (`Tuotetta ${product.name} ei ole enää saatavilla.`);
    }
  }

  removeProduct(product: IProduct) {
    this.cartService.removeProduct(product);
  }
}
