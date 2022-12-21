import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { IUser } from '../../models/user.model';
import { AccountService } from '../services/account.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  @Input()
  user!: IUser
  products: IProduct[] = [];


  constructor(
    public accountService: AccountService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products = this.cartService.getProducts();
  }

  getCartPrice() {
    return this.cartService.CalculatePrice();
  }

  removeProduct(product: IProduct) {
    this.cartService.removeProduct(product);
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
