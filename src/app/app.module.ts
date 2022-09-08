import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { PasswordRequestComponent } from './password-request/password-request.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/Material-Module';
import { TokenInterceptorService } from './service/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    SingleProductComponent,
    CartComponent,
    CartItemComponent,
    LoginComponent,
    OrderComponent,
    PasswordRequestComponent,
    ProductDetailComponent,
    EditProductComponent,
    UserProfileComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
