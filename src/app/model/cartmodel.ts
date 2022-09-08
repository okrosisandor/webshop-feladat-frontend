export interface CartModel {
  id: number;
  user: any;
  product: {
    id: number;
    name: string;
    price: number;
    image: any;
    description: string;
    availableInStock: number;
    reservedQuantity: number;
  };
  quantity: number;
  username: any;
}
