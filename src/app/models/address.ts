import { User } from './user';

export class Address {
  street: string;
  secondary: string;
  city: string;
  state: string;
  zip: string;
  users: User[];

  constructor(
    street: string,
    secondary: string,
    city: string,
    state: string,
    zip: string,
    users: User[]
  ) {
    this.street = street;
    this.secondary = secondary;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.users = users;
  }
}
