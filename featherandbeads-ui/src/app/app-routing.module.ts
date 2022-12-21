import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserAccountComponent } from './user/user-account/user-account.component';
import { RegisterLoginComponent } from './user/register-login/register-login.component';
import { AddProductComponent } from './user/add-product/add-product.component';
import { AddCategoryComponent } from './user/add-category/add-category.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './user/edit-product/edit-product.component';
import { EditCategoryComponent } from './user/edit-category/edit-category.component';
import { SecurityInfoComponent } from './info/security-info/security-info.component';
import { PaymentComponent } from './info/payment/payment.component';
import { DeliveryReturnComponent } from './info/delivery-return/delivery-return.component';
import { ContactComponent } from './info/contact/contact.component';


let routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products/:link',
    component: ProductsComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'register-login',
    component: RegisterLoginComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'security',
    component: SecurityInfoComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'delivery-return',
    component: DeliveryReturnComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-account',
        component: UserAccountComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent
      },
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'edit-category/:id',
        component: EditCategoryComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
