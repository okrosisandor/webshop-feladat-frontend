import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = 'http://localhost:8086/carts';

  constructor(private http: HttpClient) { }

  addToCart(userId: any, productId: any, quantity: any) {
    return this.http.post(`${this.apiUrl}/${userId}/${productId}`, quantity);
  }

  getCart() {
    return this.http.get<any[]>(this.apiUrl);
  }

  removeFromCart(cartId: any) {
    return this.http.delete(`${this.apiUrl}/${cartId}`);
  }

  changeAmount(cartId: any, cartItem: any, status: string){
    // console.log(cartItem.product.availableInStock)
    console.log(cartItem)
    if(status === "increase"){
      cartItem.quantity++;
      cartItem.product.reservedQuantity++;
      cartItem.product.availableInStock--;
    }else if(status === "decrease"){
      cartItem.product.availableInStock++;
      cartItem.product.reservedQuantity--;

      if(cartItem.quantity === 1){
        return this.removeFromCart(cartId)
      }else{
        cartItem.quantity--;
      }
    }

    return this.http.patch(`${this.apiUrl}/${cartId}`, cartItem);
  }

  purchaseItems(user: any){
    return this.http.patch(`${this.apiUrl}/purchase`, user); 
  }
}
