import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICategory } from '../../../models/category.model';
import { IProduct } from '../../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productCategories: ICategory[] = [];
  newProduct: IProduct = <IProduct>{};
  products: IProduct[] = [];
  modalRef?: BsModalRef;
  productToRemove!: IProduct;
  productToReturn!: IProduct;
  photoForProduct!: IProduct;

  constructor(
    private modalService: BsModalService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.productService.getProductCategories().subscribe(categories => {
      this.productCategories = categories;
    })
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.modalService.hide();
      this.getProducts();
    })
  }

  removeProduct() {
    this.productService.removeProduct(this.productToRemove).subscribe(() => {
      this.modalService.hide();
      this.getProducts();
    })
  }

  returnProduct(prodToReturn: IProduct) {
    this.productService.returnProduct(prodToReturn).subscribe(() => {
      this.getProducts();
    })
  }

  calculateTax() {
    this.newProduct.priceWithoutTax = this.newProduct.priceWithTax / 1.24;
    this.newProduct.tax = this.newProduct.priceWithTax - this.newProduct.priceWithoutTax;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template2: TemplateRef<any>, productToRemove: IProduct) {
    this.productToRemove = productToRemove;
    this.modalRef = this.modalService.show(template2);
  }

  setMainPhoto(photoId: number, productId: number) {    
    this.productService.setMainPhoto(photoId, productId).subscribe(() => {
      this.getProducts();
    })
  }
}
