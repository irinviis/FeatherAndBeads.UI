import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '../../models/category.model';
import { IUser } from '../../models/user.model';
import { AccountService } from '../services/account.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input()
  user!: IUser
  menuOpen = false;
  accountMenuOpen = false;
  productCategories: ICategory[] = []

  constructor(
    public accountService: AccountService,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe(categories => {
      this.productCategories = categories;
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  menuToggle($event: Event) {

    this.menuOpen = !this.menuOpen;
  }

  accountMenuToggle($event: Event) {

    this.accountMenuOpen = !this.accountMenuOpen;
  }
}
