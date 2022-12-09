import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  productCategories: ICategory[] = []

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe(categories => {
      this.productCategories = categories;
    })
  }
}
