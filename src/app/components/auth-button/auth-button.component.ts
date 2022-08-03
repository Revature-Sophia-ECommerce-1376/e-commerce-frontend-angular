import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import {AuthenticationService} from "../../services/authentication.service";

/**
 * Renders login button if User is logged out.
 * Else renders logout button
 */
@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button
        (click)="logout()"
        class="btn btn-outline-danger my-2 my-sm-0 mr-4"
      >
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button
        (click)="login()"
        class="btn btn-outline-success my-2 my-sm-0 mr-4"
      >
        Log in
      </button>
    </ng-template>
  `,
  styles: [],
})

/**
 * Inject DOM into component
 */
export class AuthButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private authentication:AuthenticationService
  ) { }

  /**
   * Logs User in
   */
  login() {
    this.auth.loginWithRedirect()
  }

  /**
   * Logs User out
   */
  logout() {
    this.authentication.role = "GUEST";
    this.auth.logout({ returnTo: document.location.origin })
  }
}
