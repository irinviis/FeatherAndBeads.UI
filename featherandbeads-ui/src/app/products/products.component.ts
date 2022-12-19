import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ICategory } from '../../models/category.model';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  routeSubscription: any
  categoryProducts: IProduct[] = [];

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.routeSubscription = this.router.params.subscribe(params => {
      let category = params as ICategory;
      this.getProductCategoryByLinkName(category.link);
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  getProductCategoryByLinkName(linkName: string) {
    this.productService.getProductCategoryByLinkName(linkName).subscribe(category => {
      this.getProductsForCategory(category)
    })
  }

  getProductsForCategory(category: ICategory) {
    this.productService.getProductsForCategory(category.id).subscribe(products => {      
      this.categoryProducts = products;
    })
  }

}
