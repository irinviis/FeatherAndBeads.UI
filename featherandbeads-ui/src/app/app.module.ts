import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProductsComponent } from './product/products/products.component';
import { HomeComponent } from './home/home.component';
import { RegisterLoginComponent } from './user/register-login/register-login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductsComponent,
    HomeComponent,
    RegisterLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
