/**
 * Represents a user in the system.
 */
export interface User {
  /**
   * The full name of the user.
   */
  name: string;

  /**
   * The email address of the user.
   */
  email: string;

  /**
   * The password for the user's account.
   */
  password: string;

  /**
   * The age of the user.
   */
  age: number;

  /**
   * The gender of the user.
   */
  gender: string;

  /**
   * The type of account the user has (e.g., admin, regular user).
   */
  accountType: string;

  /**
   * The phone number of the user.
   */
  phoneNumber: string;

  /**
   * Indicates whether the user has accepted the terms and conditions.
   */
  termsAndConditions: boolean;
}

export interface UserResponse extends User {
  userId: number;
}

/**
 * Represents the response received after an authentication request.
 *
 * @interface AuthResponse
 * @property {User} user - The authenticated user's details.
 * @property {string} [access_token] - An optional access token provided upon successful authentication.
 */
export interface AuthResponse {
  user: UserResponse;
  access_token: string;
}

/**
 * Enum representing the types of accounts in the shopping cart application.
 *
 * @enum {string}
 * @property {string} BUYER - Represents a buyer account type.
 * @property {string} SELLER - Represents a seller account type.
 */
export enum AccountType {
  buyer = "buyer",
  seller = "seller",
}

/**
 * Enum representing the gender of an individual.
 *
 * @enum {string}
 * @property {string} FEMALE - Represents the female gender.
 * @property {string} MALE - Represents the male gender.
 */
export enum Gender {
  female = "female",
  male = "male",
}

/**
 * Enum representing various product categories in the shopping cart application.
 *
 * @enum {string}
 * @property {string} ELECTRONICS - Represents electronic items such as gadgets and devices.
 * @property {string} CLOTHING - Represents clothing items such as shirts, pants, and dresses.
 * @property {string} HOMEAPPLIANCES - Represents home appliances such as refrigerators and microwaves.
 * @property {string} BOOKS - Represents books across various genres and categories.
 * @property {string} SPORTS - Represents sports-related items such as equipment and accessories.
 */
export enum ProductCategory {
  ELECTRONICS = "electronics",
  CLOTHING = "clothing",
  HOMEAPPLIANCES = "homeAppliances",
  BOOKS = "books",
  SPORTS = "sports",
}

/**
 * Represents a product in the shopping cart system.
 *
 * @interface Product
 *
 * @property {string} name - The name of the product.
 * @property {string} description - A brief description of the product.
 * @property {number} price - The price of the product.
 * @property {number} quantity - The available quantity of the product.
 * @property {ProductCategory} categoryType - The category to which the product belongs.
 * @property {number} userId - The ID of the user associated with the product.
 * @property {string} imageUrl - The URL of the product's image.
 * @property {number} rating - The rating for the product.
 */
export interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryType: ProductCategory;
  userId: number;
  imageUrl: string;
  rating?: number;
}
