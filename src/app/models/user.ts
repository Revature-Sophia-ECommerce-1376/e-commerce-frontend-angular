import { Address } from './address';
import { Purchase } from './purchase';

export class User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  addresses: Address[];
  purchases: Purchase[];
  reviews: any[];

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    role: string,
    purchases: Purchase[],
    reviews: any[],
    addresses: Address[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.role = role;
    this.email = email;
    this.addresses = addresses;
    this.purchases = purchases;
    this.reviews = reviews;
  }
}
