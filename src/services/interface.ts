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

/**
 * Represents the response received after an authentication request.
 *
 * @interface AuthResponse
 * @property {User} user - The authenticated user's details.
 * @property {string} [access_token] - An optional access token provided upon successful authentication.
 */
export interface AuthResponse {
  user: User;
  access_token: string;
}


/**
 * Enum representing the types of accounts in the shopping cart application.
 * 
 * @enum {string}
 * @property {string} Buyer - Represents a buyer account type.
 * @property {string} Seller - Represents a seller account type.
 */
export enum AccountType {
  Buyer = "Buyer",
  Seller = "Seller",
}

/**
 * Enum representing the gender of an individual.
 * 
 * @enum {string}
 * @property {string} Female - Represents the female gender.
 * @property {string} Male - Represents the male gender.
 */
export enum Gender {
  Female = "Female",
  Male = "Male",
}

