import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { PasswordRequestComponent } from './password-request/password-request.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RoleGuard } from './guard/role.guard';
import { AuthGuard } from './guard/auth.guard';

const appRoutes: Routes = [
  { path: 'products', component: ProductsComponent, title: 'Products' },
  {
    path: 'products/:id/details',
    component: ProductDetailComponent,
    title: 'Product detail',
  },
  {
    path: 'products/:id/edit',
    component: EditProductComponent,
    title: 'Edit product',
    canActivate: [RoleGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Your cart',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: 'order/:id',
    component: OrderComponent,
    title: 'Submit order',
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'user/edit',
  //   component: PasswordRequestComponent,
  //   title: 'Enter password',
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'user/edit',
    component: UserProfileComponent,
    title: 'Edit details',
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
