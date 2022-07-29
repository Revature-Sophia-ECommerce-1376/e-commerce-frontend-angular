import { AuthService } from 'src/app/services/auth.service';
import { AddressService } from './../../services/address.service';
import { ReviewService } from './../../services/review.service';
import { Router } from '@angular/router';
import { PurchaseService } from './../../services/purchase.service';
import { Purchase } from './../../models/purchase';
import { AppComponent } from './../../app.component';
import { Address } from './../../models/address';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  addresses: any[] = [];
  purchases: Purchase[] = [];
  reviews: any[] = [];

  modalVisibility: string = "";

  tempUser: User = new User(1, "", "", "", "", "", this.reviews, this.purchases, this.addresses);

  currAddress: Address = new Address(0, '', '', '', '', '', this.tempUser);

  contentSelected: string = "info";

  constructor(public appComponent: AppComponent, private userv: UserService,
    private pserv: PurchaseService,
    private reviewService: ReviewService,
    private addressService: AddressService,
    private router: Router) { }

  ngOnInit(): void {
    this.tempUser = this.appComponent.curUser;
    this.getPurchases();
    this.seeReviews(this.appComponent.curUser.id);
    this.getAddresses();

    if (this.addresses.length > 1) {
      setTimeout(() => {
        this.currAddress = this.addresses[0];
        console.log(this.currAddress);
      }, 100)
    }

    this.appComponent.curUser.reviews = this.reviews;
  }

  openPopup() {

    this.modalVisibility = "block";
  }

  closePopup() {

    this.modalVisibility = "none"

  }


  updateInfo() {
    this.closePopup();

    if (this.addresses.length < 1) {
      this.addressService.addAddress(this.currAddress)
    }

    this.appComponent.curUser = this.tempUser;

    this.currAddress.users = this.appComponent.curUser;
    this.updateAddress();

    setTimeout(() => {
      this.appComponent.curUser.addresses = this.addresses;
      this.userv.updateUser(this.appComponent.curUser).subscribe(
        data => {
          this.appComponent.curUser = data;
        },
        (err) => console.log(err)
      )
    }, 200)

    setTimeout(() => {
      this.getPurchases();
    }, 300)
    setTimeout(() => {
      this.getAddresses();
    }, 400)
  }

  changeContent(content: string) {

    document.getElementsByName("button").forEach(button => {
      button.classList.remove("active");
    })

    document.getElementById(content)?.classList.add("active");

    this.contentSelected = content;
  }

  seeReviews(userId:number) {
    this.reviewService.getUsersReviews(userId).subscribe({
      next: (response) => {
        for (let review of Object.values(response)) {
          this.reviews.push(review);
          console.log(review);
        }

        this.reviews = this.reviews.filter((review) => {
          return review.content != ""
        });
      }
    })
  }

  getPurchases() {

    this.pserv.getUserPurchases(this.appComponent.curUser.id).subscribe(
      data => {
        this.appComponent.curUser.purchases = data;
      },
      (err) => console.log(err)
    )
  }

  getAddresses() {
    this.addresses = [];
    this.addressService.getUserAddresses(this.appComponent.curUser.id).subscribe(
      data=> {
        for (let address of Object.values(data)) {
          this.addresses.push(address);
        }
      },
      (err) => console.log(err)
    )
  }

  updateAddress() {
    this.addresses = [];
    this.addressService.updateAddress(this.currAddress).subscribe(
      data =>  {
        this.addresses.push(data);
      },
      (err) => console.log(err)
    )
  }

  selectItem(itemId: number) {
    sessionStorage.setItem('selectedProductId', itemId.toString());
  }
}
