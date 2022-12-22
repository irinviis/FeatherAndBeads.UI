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

  getProductCategoryByLinkName(linkName: string) {
    return this.http.get<ICategory>(`${this.baseUrl}Product/GetCategoryByLinkName?linkName=${linkName}`);
  }

  getProductCategories() {
    return this.http.get<ICategory[]>(this.baseUrl + 'Product/GetCategories');
  }

  getCategory(catId: number) {
    return this.http.get<ICategory>(this.baseUrl + 'Product/GetCategory?categoryId=' + catId);
  }

  addCategory(category: ICategory) {
    return this.http.post(this.baseUrl + 'Product/add-category', category);
  }

  updateCategory(category: ICategory) {
    return this.http.post(this.baseUrl + 'Product/update-category', category);
  }

  uploadCategoryPhoto(category: ICategory) {
    const address = this.baseUrl + `Product/upload-category-photo?categoryId=${category.id}`

    let formData = new FormData();
    formData.append("photo", category.photoFileForUpload);    
    return this.http.post(address, formData);
  }

  removeCategoryPhoto(phId: number) {
    const address = this.baseUrl + `Product/remove-category-photo?photoId=${phId}`
    return this.http.post(address, {});
  }

  removeCategory(category: ICategory) {
    return this.http.post(this.baseUrl + 'Product/remove-category', category);
  }

  getProductsForCategory(catgId: number) {
    const address = this.baseUrl + `Product/GetProductsForCategory?categoryId=${catgId}`
    return this.http.get<IProduct[]>(address);
  }

  getProducts() {
    return this.http.get<IProduct[]>(this.baseUrl + 'Product/GetProducts');
  }

  getProduct(prodId: number) {
    return this.http.get<IProduct>(this.baseUrl + 'Product/' + prodId);
  }

  addProduct(product: IProduct) {
    return this.http.post(this.baseUrl + 'Product/add-product', product);
  }

  updateProduct(product: IProduct) {
    return this.http.post(this.baseUrl + 'Product/update-product', product);
  }

  removeProduct(product: IProduct) {
    debugger
    return this.http.post(this.baseUrl + 'Product/remove-product', product);
  }

  setMainPhoto(phId: number, prodId: number) {
    const address = this.baseUrl + `Product/set-main-photo?photoId=${phId}&productId=${prodId}`
    return this.http.post(address, {});
  }

  removePhoto(phId: number) {
    const address = this.baseUrl + `Product/remove-photo?photoId=${phId}`
    return this.http.post(address, {});
  }

  uploadProductFiles(product: IProduct) {
    const address = this.baseUrl + `Product/upload-product-photos?productId=${product.id}`
    let formData = new FormData();
    product.photoFilesForUpload.forEach((photo) => {
      formData.append("photos", photo);
    })
    return this.http.post(address, formData);      
  }

  getProductSaldo(productId: number) {
    return this.http.get<number>(this.baseUrl + 'Product/getProductSaldo?productId=' + productId);
  }
  
}                                                                                                                                                                                                                                                                                                                                                                 
