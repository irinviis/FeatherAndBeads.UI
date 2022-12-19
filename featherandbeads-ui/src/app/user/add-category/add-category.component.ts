import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICategory } from '../../../models/category.model';
import { ProductService } from '../../services/product.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPhoto } from '../../../models/photo.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  productCategories: ICategory[] = [];
  @ViewChild('editForm')
  editForm!: NgForm;
  newCategory: ICategory = <ICategory>{};
  modalRef?: BsModalRef;
  categoryToRemove!: ICategory;


  constructor(
    private productService: ProductService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productService.getProductCategories().subscribe(categories => {
      this.productCategories = categories;
    })
  }

  addCategory() {    
    this.productService.addCategory(this.newCategory).subscribe(() => {
      this.modalService.hide();
      this.getCategories();
    })
  }

  removeCategory() {
    this.productService.removeCategory(this.categoryToRemove).subscribe(() => {
      this.modalService.hide();
      this.getCategories();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template2: TemplateRef<any>, catToRemove: ICategory) {
    this.categoryToRemove = catToRemove;
    this.modalRef = this.modalService.show(template2);
  }
}
