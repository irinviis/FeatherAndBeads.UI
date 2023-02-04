import { Component, Input, OnInit } from '@angular/core';
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
  /*galleryOptions: NgxGalleryOptions[] = [];*/
  productPhotos: GalleryImage[] = [];
  alert = false;
  alertMsg = '';

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProduct();
    //this.galleryOptions = [
    //  {
    //    width: '100%',
    //    height: '850px',
    //    thumbnailsColumns: 3,
    //    imageAnimation: NgxGalleryAnimation.Slide
    //  },
    //  //{
    //  //  breakpoint: 400,
    //  //  width: '100%',
    //  //  height: '300px',
    //  //  imagePercent: 100,
    //  //  thumbnailsPercent: 20,
    //  //  thumbnailsMargin: 20,
    //  //  thumbnailMargin: 20
    //  //},
    //  {
    //    breakpoint: 400,
    //    preview: false
    //  }
    //];
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

  countProductInCart(product: IProduct):number {
    return this.cartService.countProductInCart(product);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
}
