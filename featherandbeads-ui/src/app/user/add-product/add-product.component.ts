import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICategory } from '../../../models/category.model';
import { IProduct } from '../../../models/product.model';
import { IUser } from '../../../models/user.model';
import { AccountService } from '../../services/account.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

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
