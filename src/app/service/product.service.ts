import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:8086/products';

  constructor(private http: HttpClient) {}

  createProduct() {}

  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(id: any) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateProduct(product: any){
    return this.http.post(this.apiUrl, product).pipe(
      catchError((err) => {
        return throwError(err);
      }))
  }
}
