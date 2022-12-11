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
  selectedCategory: ICategory = <ICategory>{}
  routeSubscription: any
  categoryProducts: IProduct[] = [];
  productCategoryId!: IProduct;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }


  ngOnInit(): void {

    this.routeSubscription = this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      const navigation = this.router.getCurrentNavigation();  
      if (navigation?.extras?.state) {
        this.selectedCategory = navigation?.extras?.state as ICategory
        this.getProductsForCategory();
      }         
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  getProductsForCategory() {
    this.productService.getProductsForCategory(this.selectedCategory.id).subscribe(products => {
      this.categoryProducts = products;
    })
  }

}
