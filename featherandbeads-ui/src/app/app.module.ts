import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './jwt.interceptor';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { InputComponent } from './shared/input/input.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AddCategoryComponent } from './user/add-category/add-category.component';
import { AddProductComponent } from './user/add-product/add-product.component';
import { EditProductComponent } from './user/edit-product/edit-product.component';
import { OrdersComponent } from './user/orders/orders.component';
import { RegisterLoginComponent } from './user/register-login/register-login.component';
import { UserAccountComponent } from './user/user-account/user-account.component';
import { EditCategoryComponent } from './user/edit-category/edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterLoginComponent,
    ProductsComponent,
    InputComponent,
    UserAccountComponent,
    NotFoundComponent,
    ShoppingCartComponent,
    NavHeaderComponent,
    FooterComponent,
    ProductComponent,
    AddProductComponent,
    AddCategoryComponent,
    OrdersComponent,
    EditProductComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    FileUploadModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
