import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  navigationSubscription;

  customerCart: any = [];
  totalAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
      }
    });
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCart().subscribe((data) => {
      this.customerCart = data;

      for (let i = 0; i < this.customerCart.length; i++) {
        let currentPrice =
          this.customerCart[i].product.price * this.customerCart[i].quantity;
        this.totalAmount += currentPrice;
      }
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getCart() {
    const id = this.route.snapshot.params['id'];

    this.cartService.getCart().subscribe((data) => {
      this.customerCart = data;
    });
  }

  onElementDeleted(cartItem) {
    let index = this.customerCart.findIndex((elt) => elt === cartItem);
    if (index != -1) {
      // this.customerCart.splice(index, 1);
      this.customerCart = this.customerCart.filter((c) => c.id != cartItem.id);

      this.totalAmount = 0;

      for (let i = 0; i < this.customerCart.length; i++) {
        let currentPrice =
          this.customerCart[i].product.price * this.customerCart[i].quantity;
        this.totalAmount += currentPrice;
      }
    }
  }
}
