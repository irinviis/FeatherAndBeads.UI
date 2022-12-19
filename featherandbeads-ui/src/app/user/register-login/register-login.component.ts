import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../../models/user.model';
import { AccountService } from '../../services/account.service';
import { RegisterValidator } from '../../validators/register-validator';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  model = {
    email: '',
    password: ''
  }

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z!@#$%^&*()_+=<>?]*$)^([a-zA-Z!@#$%^&*()_+=<>?0-9]{6,15})$/)
    ]),
    confirm_password: new FormControl('', [
      Validators.required
    ])
  }, [RegisterValidator.match('password', 'confirm_password')])

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.registerForm.value as IUser).subscribe(() => {
      this.router.navigateByUrl('/add-product')
    }, error => {
      console.log(error)
    })
  }

  login() {
    this.accountService.login(this.model).subscribe(() => {
      this.router.navigateByUrl('/add-product');
    }, error => {
      console.log(error);
    })
  }

}
