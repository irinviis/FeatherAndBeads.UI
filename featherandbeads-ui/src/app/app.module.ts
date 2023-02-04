import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from '@daelmaak/ngx-gallery';
import { registerLocaleData } from '@angular/common';
import localeFi from '@angular/common/locales/fi';
registerLocaleData(localeFi, 'fi');

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EditCategoryComponent } from './user/edit-category/edit-category.component';
import { SecurityInfoComponent } from './info/security-info/security-info.component';
import { PaymentComponent } from './info/payment/payment.component';
import { DeliveryReturnComponent } from './info/delivery-return/delivery-return.component';
import { ContactComponent } from './info/contact/contact.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavImageComponent } from './nav-image/nav-image.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterLoginComponent,
    ProductsComponent,
    InputComponent,
    NotFoundComponent,
    ShoppingCartComponent,
    NavHeaderComponent,
    FooterComponent,
    ProductComponent,
    AddProductComponent,
    AddCategoryComponent,
    OrdersComponent,
    EditProductComponent,
    EditCategoryComponent,
    SecurityInfoComponent,
    PaymentComponent,
    DeliveryReturnComponent,
    ContactComponent,
    UserOrdersComponent,
    UserInfoComponent,
    CheckoutComponent,
    NavImageComponent
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
    GalleryModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID,
      useValue: 'fi-FI'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
