import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: IProduct = <IProduct>{};
  productId: number = 0;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
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
}
