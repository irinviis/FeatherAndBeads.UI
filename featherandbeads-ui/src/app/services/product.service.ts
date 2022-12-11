import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICategory } from '../../models/category.model';
import { IProduct } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  

  constructor(
    private http: HttpClient
  ) { }

  getProductCategories() {
    return this.http.get<ICategory[]>(this.baseUrl + 'Product/GetCategories');
  }

  getProductsForCategory(catgId: number) {
    const address = this.baseUrl + `Product/GetProductsForCategory?categoryId=${catgId}`
    console.log(address)
    return this.http.get<IProduct[]>(address, {});
  }

  getProducts() {
    return this.http.get<IProduct[]>(this.baseUrl + 'Product/GetProducts');
  }

  addProduct(product: IProduct) {
    return this.http.post(this.baseUrl + 'Product/add-product', product);
  }
}                                                                                                                                                                                                                                                                                                                                                                 
