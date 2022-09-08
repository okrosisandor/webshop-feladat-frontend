import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private service: ProductService, private http: HttpClient) {}

  products = [];

  token: any;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
