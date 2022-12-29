import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  @Input('productId') id: any;
  @Input('productName') name: string;
  @Input('productPrice') price: string;
  @Input() availableProducts: number;

  cartQuantity: number;

  cartForm = new FormGroup({
    quantity: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.min(1)])
    ),
  });

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // const decoded: any = jwt_decode(localStorage.getItem('token'));
    // console.log(decoded.roles);
    // console.log(decoded.roles.includes('ROLE_ADMIN'));

    // console.log('--------');
    // console.log(this.userService.isAdmin());
  }

  addToCart() {
    if (this.cartForm.valid) {
      this.cartQuantity = +this.cartForm.value.quantity;
      this.cartService
        .addToCart(1, this.id, { quantity: this.cartQuantity })
        .subscribe((res) => {
          this.router.navigate(["/cart"]);
        });
    }
  }

  isAdmin() {
    return this.userService.isAdmin();
  }
}
