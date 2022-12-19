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

  constructor() {}

  ngOnInit(): void {
    
  }

  
}
