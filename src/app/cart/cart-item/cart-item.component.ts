import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartId: any;
  @Input() productId: any;
  @Input() userId: any;
  @Input() productName: string;
  @Input() price: any;
  @Input() quantity: any;
  @Input() productPrice: any;
  @Input() cart: any;

  currentTotal: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Display with 2 decimals
    this.currentTotal = Math.round(this.price * this.quantity * 100) / 100;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.cartId).subscribe((res) => {
      this.reloadCurrentRoute();
    });

  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  changeAmount(status: string) {
    this.cartService
      .changeAmount(this.cartId, this.cart, status)
      .subscribe((res) => {
        this.reloadCurrentRoute();
      });
  }
}
