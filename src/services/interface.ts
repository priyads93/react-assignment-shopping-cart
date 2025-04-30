export enum Gender {
  FEMALE = "female",
  MALE = "male",
}

export enum AccountType {
  BUYER = "buyer",
  SELLER = "seller",
}

export enum CategoryType {
  ELECTRONICS = "electronics",
  CLOTHING = "clothing",
  HOMEAPPLIANCES = "homeAppliances",
  BOOKS = "books",
  SPORTS = "sports",
}

export enum PaymentMode {
  ONLINE = "online",
  OFFLINE = "offline",
}

export enum ModifyOrderQuantity {
  INCREASE = "increase",
  DECREASE = "decrease",
}

export enum OrderStatus {
  CANCELLED = "cancelled",
  SUCCESSFUL = "successful",
  CREATED = "created",
}

export type Address = {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country: string;
};

export interface Specifications {
  dimensions?: string;
  weight?: string;
  brand?: string;
  material?: string;
  manufacturer?: string;
  modelNumber?: string;
  colour?: string;
  countryOfOrigin?: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: Gender;
  accountType: AccountType;
  phoneNumber: string;
  termsAndConditions: boolean;
}

export interface UserResponse extends User {
  id: number;
  products: ProductResponse[];
  orders: OrderResponse[];
  cartItems: CartItemResponse[];
  createdDate: string;
  updatedDate: string;
}

export interface CreateUser extends User {}

export interface UpdateUser
  extends Omit<User, "accountType" | "termsAndConditions" | "email"> {}

export interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryType: CategoryType;
  imageUrl: string;
  rating: number;
  specifications?: Specifications;
}

export interface ProductResponse extends Product {
  id: number;
  user: UserResponse;
  userId: number;
  orderItems: OrderItem[];
  createdDate: string;
  updatedDate: string;
}

export interface CreateProduct extends Product {
  userId: number;
  orderItems: { productId: number; quantity: number }[];
}

export interface UpdateProduct extends Partial<Product> {
  modifyQuantity?: ModifyOrderQuantity;
}

export interface Order {
  description: string;
  paymentMode: PaymentMode;
  orderStatus: OrderStatus;
  totalCost: number;
  address?: Address;
}

export interface OrderResponse extends Order {
  id: number;
  userId: number;
  user: UserResponse;
  orderItems: OrderItemResponse[];
  createdDate: string;
  updatedDate: string;
}

export interface CreateOrder extends Order {
  userId: number;
  orderItems: Omit<OrderItem, "orderId">[];
}

export interface UpdateOrder extends Partial<Order> {}

export interface OrderItem {
  quantity: number;
  orderId: number;
  productId: number;
}

export interface OrderItemResponse extends OrderItem {
  quantity: number;
  order: OrderResponse;
  product: ProductResponse;
}

export interface CreateOrderItem extends OrderItem {}

export interface UpdateOrderItem
  extends Omit<OrderItem, "orderId" | "productId"> {}

export interface CartItem {
  productId: number;
  userId: number;
  quantity: number;
}

export interface CreateCartItem extends CartItem {}

export interface UpdateCartItem extends Omit<CartItem, "userId" | "productId"> {
  id: string;
}

export interface CartItemResponse extends CartItem {
  id?: number;
  quantity: number;
  user?: UserResponse;
  product?: ProductResponse;
}

export interface AuthResponse {
  user: UserResponse;
  access_token: string;
}
