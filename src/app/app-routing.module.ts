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
  { path: 'cart/:id', component: CartComponent, title: 'Your cart' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'order/:id', component: OrderComponent, title: 'Submit order' },
  // { path: 'user/edit', component: PasswordRequestComponent },
  { path: 'user/edit', component: UserProfileComponent, title: 'Edit details' },
  { path: '**', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
