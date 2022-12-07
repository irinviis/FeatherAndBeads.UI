import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterLoginComponent } from './user/register-login/register-login.component';
import { ProductsComponent } from './products/products.component';
import { InputComponent } from './shared/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAccountComponent } from './user/admin-account/admin-account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterLoginComponent,
    ProductsComponent,
    InputComponent,
    AdminAccountComponent,
    NotFoundComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
