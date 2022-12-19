import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../../models/category.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @ViewChild('editForm')
  editForm!: NgForm;
  category: ICategory = <ICategory>{};
  categoryId: number = 0;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    const catIdStr = this.router.snapshot.paramMap.get('id');
    if (catIdStr) {
      this.categoryId = parseInt(catIdStr);
    }
    this.productService.getCategory(this.categoryId).subscribe(category => {
      this.category = category;
    })
  }

  updateCategory(categoryToUpdate: ICategory) {
    this.productService.updateCategory(categoryToUpdate).subscribe(() => {
      this.getCategory();
    })
  }

  addFileToCategory(category: ICategory, event: Event) {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files as FileList);

    if (files && files.length > 0) {
      category.photoFileForUpload = files[0];     
    }
  }

  removeCategoryPhoto(phId: number) {
    this.productService.removeCategoryPhoto(phId).subscribe(() => {
      this.getCategory();
    })
  }

  uploadCategoryPhoto(category: ICategory) {
    if (category) {
      category.isLoading = true;
      this.productService.uploadCategoryPhoto(category).subscribe(() => {
        this.getCategory();
      }, error => {
        console.log(error)
      })
    }
  }
}
