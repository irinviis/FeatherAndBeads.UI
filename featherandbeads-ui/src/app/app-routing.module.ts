import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminAccountComponent } from './user/admin-account/admin-account.component';
import { RegisterLoginComponent } from './user/register-login/register-login.component';


let routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  
  {
    path: 'products/:cat',
    component: ProductsComponent
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
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin-account',
        component: AdminAccountComponent
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
