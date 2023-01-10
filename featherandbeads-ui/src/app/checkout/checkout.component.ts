import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../models/product.model';
import { CartService } from '../services/cart.service';
import { RegisterValidator } from '../validators/register-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: IProduct[] = [];
  registerMode = false;
  otherAddress = false;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products = this.cartService.getProducts();
  }

  getPriceTax() {
    return this.cartService.calculateTax();
  }

  getCartPrice() {
    return this.cartService.CalculatePrice();
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    streetAddress: new FormControl('', [
      Validators.required
    ]),
    postCode: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
      Validators.required
    ]),
    mobile: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/(?!^[0-9]*$)(?!^[a-zA-Z!@#$%^&*()_+=<>?]*$)^([a-zA-Z!@#$%^&*()_+=<>?0-9]{6,15})$/)
    ]),
    confirm_password: new FormControl('', [
      Validators.required
    ])
  }, [RegisterValidator.match('password', 'confirm_password')])

  registerToggle($event: Event) {
    $event.preventDefault()

    this.registerMode = !this.registerMode;
  }

  otherAddressToggle($event: Event) {
    $event.preventDefault()

    this.otherAddress = !this.otherAddress;
  }
}
