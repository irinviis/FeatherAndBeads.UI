import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../services/product.service';
import { GalleryImage } from '@daelmaak/ngx-gallery';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: IProduct = <IProduct>{};
  productId: number = 0;
  productPhotos: GalleryImage[] = [];
  showAlert = false
  alertMsg = ''

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private cartService: CartService
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

      this.productPhotos = [];
      this.product.photos.forEach((f) => {
        this.productPhotos.push(new GalleryImage(f.url, f.url));
      })
    })
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    this.showAlert = true
    this.alertMsg = 'Tuote on lisätty ostoskoriin!'
    setInterval(() => {
      this.showAlert = false
    }, 3000);
  }
}
