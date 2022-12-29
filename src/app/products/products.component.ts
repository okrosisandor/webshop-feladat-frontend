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

  p: number = 1;
  itemsPerPage: number = 5;
  totalPages: any;

  token: any;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts().subscribe((data) => {
      this.products = data;
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    });
    console.log(this.products)
  }
}
