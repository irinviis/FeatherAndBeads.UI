import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ICategory } from '../../../models/category.model';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../../models/product.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  user!: IUser;
  @ViewChild('editForm')
  editForm!: NgForm;
  productCategories: ICategory[] = [];
  newProduct: IProduct = <IProduct>{};
  products: IProduct[] = [];
  modalRef?: BsModalRef;

  constructor(
    public accountService: AccountService,
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private productService: ProductService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(usr =>
      this.user = usr);
  }

  ngOnInit(): void {
    this.getUser();
    this.getCategories();
    this.getProducts();
  }

  getUser() {
    const userIdString = this.route.snapshot.paramMap.get('id');

    if (userIdString) {
      const userId = Number(userIdString);

      this.userService.getUser(userId).subscribe(usr => {
        this.user = usr;
      })
    }
  }

  getCategories() {
    this.productService.getProductCategories().subscribe(categories => {
      this.productCategories = categories;
    })
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.modalService.hide();
      this.getProducts();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
