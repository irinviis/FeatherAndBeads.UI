import { EventEmitter, Injectable, Output } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  storageKey: string = "cart";
  products: IProduct[] = [];
  @Output() HasUpdates = new EventEmitter();

  constructor(
    private productService: ProductService
  ) { }

  CalculatePrice(): number {
    var price: number = 0;

    this.products.forEach((product) => {
      price += product.priceWithTax * product.cartQuantity;
    })
    return price;
  }

  getCartQuantity(): number {
    var quantity: number = 0;

    this.products.forEach((product) => {
      quantity += product.cartQuantity;
    })
    return quantity;
  }



  addToCart(product: IProduct) {
    var existingProduct = this.products.find(p => p.id === product.id);

    this.productService.getProductSaldo(product.id).subscribe(saldo => {
      if (saldo > 0) {
        if (existingProduct) {
          if (existingProduct.cartQuantity < saldo) {
            existingProduct.cartQuantity++;
          }
          else {
            alert("Tuotteita ei voi lisätä enemmän kuin " + saldo);
          }
        }
        else {
          this.products.push(product);
        }
      }
      else {
        alert("Tuotetta ei ole enää saatavilla");
        if (existingProduct) {
          var index = this.products.indexOf(existingProduct);
          this.products.splice(index, 1);
        }
      }

      localStorage.setItem(this.storageKey, JSON.stringify(this.products));
      this.HasUpdates.emit();
    })
  }


  getProducts() {
    var cartFromStorage = localStorage.getItem(this.storageKey)
    if (cartFromStorage) {
      this.products = JSON.parse(cartFromStorage);
    }
    return this.products;
  }

  updateProductQuantity(product: IProduct) {
    var existingProduct = this.products.find(p => p.id === product.id);

    this.productService.getProductSaldo(product.id).subscribe(saldo => {
      if (existingProduct) {
        if (saldo > 0) {

          if (product.cartQuantity > saldo) {
            alert(`Tuotetta ${product.name} on saatavilla enintään ${saldo}.`);
            existingProduct.cartQuantity = saldo;
          }
          else if (product.cartQuantity === 0)
          {
            var index = this.products.indexOf(existingProduct);
            this.products.splice(index, 1);
          }
          else {
            existingProduct.cartQuantity = product.cartQuantity;            
          }
        }
        else {
          alert(`Tuotetta ${product.name} ei ole enää saatavilla.`);

          var index = this.products.indexOf(existingProduct);
          this.products.splice(index, 1);

        }

        localStorage.setItem(this.storageKey, JSON.stringify(this.products));
        this.HasUpdates.emit();
      }
    });

  }


  removeProduct(product: IProduct) {
    var existingProduct = this.products.find(p => p.id === product.id);

    if (existingProduct) {
        var index = this.products.indexOf(existingProduct);
        this.products.splice(index, 1);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
    this.HasUpdates.emit();
  }


}
