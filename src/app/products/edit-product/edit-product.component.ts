import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product: any;
  errors: any
  alreadySubmitted = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService
  ) {}

  updateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    availableInStock: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.service.getProductById(id).subscribe((data) => {
      this.product = data;
      if (this.product != null) {
        this.updateForm.setValue({
          name: this.product.name,
          price: this.product.price,
          availableInStock: this.product.availableInStock,
          description: this.product.description,
        });
      }
    });
  }

  updateProduct() {

      this.alreadySubmitted = true;

      this.product.name = this.updateForm.value.name;
      this.product.price = this.updateForm.value.price;
      this.product.availableInStock = this.updateForm.value.availableInStock;
      this.product.description = this.updateForm.value.description;

      this.service.updateProduct(this.product).subscribe(
        (res) => {
          this.router.navigate(['/products']);
        },
        (err) => {
          this.errors = err.error;
        }
      );
  }
}
