import { Injectable } from '@angular/core';
import { IProduct } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  storageKey: string = "cart";
  products: IProduct[] = [];

  constructor() { }

  CalculatePrice(): number {
    var price: number = 0;

    this.products.forEach((product) => {
      price += product.priceWithTax
    })
    return price;
  }

  addToCart(product: IProduct) {
    this.products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  }

  getProducts() {
    var cartFromStorage = localStorage.getItem(this.storageKey)
    if (cartFromStorage) {
      this.products = JSON.parse(cartFromStorage);
    }
    return this.products;
  }

  removeProduct(product: IProduct) {
    var prodIndex = this.products.indexOf(product);

    if (prodIndex >= 0) {
      this.products.splice(prodIndex, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(this.products));
    }
  }

  clearCart() {
    this.products = [];
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  }
}
