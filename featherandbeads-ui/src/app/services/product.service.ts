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

  getProductsForCategory(categoryId: number) {
    return this.http.get<IProduct[]>(this.baseUrl + 'Product?categoryId=' + categoryId);
  }
}                                                                                                                                                                                                                                                                                                                                                                 
