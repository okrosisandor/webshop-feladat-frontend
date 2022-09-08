import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import jwt_decode from 'jwt-decode';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  userAddress: any;
  theUser: any;
  alreadySubmitted = false;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.userService.getUserName()).subscribe(
      (res) => {
        this.userAddress = res;
        let deliveryAddress = this.userAddress.userDeliveryAddress;

        this.orderForm.setValue({
          country: deliveryAddress === null ? this.userAddress.userAddress.country : deliveryAddress.country,
          city: deliveryAddress === null ? this.userAddress.userAddress.city : deliveryAddress.city,
          zipCode: deliveryAddress === null ? this.userAddress.userAddress.zipCode : deliveryAddress.zipCode,
          address: deliveryAddress === null ? this.userAddress.userAddress.address : deliveryAddress.address,
          phone: deliveryAddress === null ? this.userAddress.userAddress.phone : deliveryAddress.phone,
        });
      },
      (err) => {}
    );
  }

  orderForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  orderHandler() {
    this.alreadySubmitted = true;

    this.userAddress = {
      country: this.orderForm.value.country,
      city: this.orderForm.value.city,
      zipCode: this.orderForm.value.zipCode,
      address: this.orderForm.value.address,
      phone: this.orderForm.value.phone,
    };

    let user;

    this.userService
      .getUser(this.userService.getUserName())
      .subscribe((res) => {
        this.theUser = res;

        user = {
          id: this.theUser.id,
          firstName: this.theUser.firstName,
          lastName: this.theUser.lastName,
          email: this.theUser.email,
          password: this.theUser.password,
          confirmPassword: this.theUser.confirmPassword,
          userAddress: this.theUser.userAddress,
          userDeliveryAddress: this.userAddress,
        };


        if(this.orderForm.valid){
          this.cartService.purchaseItems(user).subscribe(
            (res) => {},
            (err) => {}
          );

          this.router.navigate(['/products']);
        }
      });
  }

  orderFormControl() {
    return this.orderForm.controls;
  }
}
