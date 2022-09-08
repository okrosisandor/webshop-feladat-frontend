import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

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

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart() {
    if (this.cartForm.valid) {
      this.cartQuantity = +this.cartForm.value.quantity;
      this.cartService
        .addToCart(1, this.id, { quantity: this.cartQuantity })
        .subscribe((res) => {
          this.router.navigate([`/cart/${1}`]);
        });
    }
  }
}
