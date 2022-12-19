import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productCategories: ICategory[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.productService.getProductCategories().subscribe(categories => {
      this.productCategories = categories;
    })
  }
}
