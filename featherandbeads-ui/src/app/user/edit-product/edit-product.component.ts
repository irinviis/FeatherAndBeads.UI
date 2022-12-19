import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICategory } from '../../../models/category.model';
import { IPhoto } from '../../../models/photo.model';
import { IProduct } from '../../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChild('editForm')
  editForm!: NgForm;
  productCategories: ICategory[] = [];
  product: IProduct = <IProduct>{};
  productId: number = 0;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct();
  }

  getCategories() {
    this.productService.getProductCategories().subscribe(categories => {
      this.productCategories = categories;
    })
  }

  getProduct() {
    const prodIdStr = this.router.snapshot.paramMap.get('id');
    if (prodIdStr) {
      this.productId = parseInt(prodIdStr);
    }
    this.productService.getProduct(this.productId).subscribe(product => {
      this.product = product;
    })
  }

  updateProduct(productToUpdate: IProduct) {
    this.productService.updateProduct(productToUpdate).subscribe(() => {
      this.getProduct();
    })
  }

  setMainPhoto(photoId: number, productId: number) {
    this.productService.setMainPhoto(photoId, productId).subscribe(() => {
      this.getProduct();
    })
  }

  addFilesToProduct(product: IProduct, event: Event) {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files as FileList);
    if (!product.photoFilesForUpload) {
      product.photoFilesForUpload = [];
    }

    if (files && files.length > 0) {
      files.forEach(file => {
        var fileWithSameName = product.photoFilesForUpload.find(f => f.name === file.name);
        if (!fileWithSameName) {
          product.photoFilesForUpload.push(file);
        }
      });
    }
  }

  removeFileFromProduct(product: IProduct, file: File) {
    if (product && file) {
      var indexOfFile = product.photoFilesForUpload.indexOf(file);
      product.photoFilesForUpload.splice(indexOfFile, 1);
    }
  }

  removeProductPhoto(phId: number) {
    this.productService.removePhoto(phId).subscribe(() => {
      this.getProduct();
    })
  }

  uploadProductFiles(product: IProduct) {
    if (product) {
      product.isLoading = true;
      this.productService.uploadProductFiles(product).subscribe(() => {
        this.getProduct();
      }, error => {
        console.log(error)
      })
    }
  }
}
