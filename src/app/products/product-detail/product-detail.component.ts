import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: any;

  cartQuantity: number;

  cartForm = new FormGroup({
    quantity: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.min(1)])
    ),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart() {
    if (this.cartForm.valid) {
      const id = this.route.snapshot.params['id'];
      this.cartQuantity = +this.cartForm.value.quantity;
      this.cartService
        .addToCart(1, id, { quantity: this.cartQuantity })
        .subscribe((res) => {
          this.router.navigate(["/cart"]);
        });
    }
  }

  isAdmin() {
    return this.userService.isAdmin();
  }
}
