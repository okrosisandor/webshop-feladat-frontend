import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  navigationSubscription;

  customerCart: any = []
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
    const id = this.route.snapshot.params['id'];

    this.cartService.getCart(1).subscribe((data) => {

      for(let i = 0; i < data.length; i++){
        this.customerCart.push(data[i])
      }

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

    this.cartService.getCart(1).subscribe((data) => {
      this.customerCart = data;
    });
  }
}
