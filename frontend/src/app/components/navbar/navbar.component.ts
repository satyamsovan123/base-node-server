import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

/**
 * This component is used to show the navigation bar on the screen.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  /**
   * This is the constructor of this component.
   * @param commonService is used to update the [loggedInUserSubject]{@link CommonService#loggedInUserSubject}.
   */
  constructor(private commonService: CommonService) {}
  /**
   * This is the logged in user's name. It is initialized with an empty string.
   * @type {string}
   * @default ''
   */
  loggedInUser: string = '';

  /**
   * This method is used to initialize the component. It will check if the user is logged in or not.
   */
  ngOnInit(): void {
    this.checkIsLoggedIn();
  }

  /**
   * This method is used to sign out the logged in user when user clicks on the 'Sign out' button. It will call the [handleSignOut]{@link CommonService#handleSignOut} method.
   */
  handleSignOut(): void {
    this.commonService.signOut();
  }

  /**
   * This method is used to check if the user is logged in or not. And, if user is not logged in, then it will not show the 'Sign out' button, 'Get data' and 'Post data' button on the screen. It would only show the 'Sign in' and 'Sign up' button.
   * It will subscribe to the [loggedInUserSubject]{@link CommonService#loggedInUserSubject} to get the logged in user's name. It will update the username or log error in the console.
   * This is also use to show the logged in user's name on the screen.
   */
  checkIsLoggedIn(): void {
    this.commonService.loggedInUserSubject.subscribe({
      next: (loggedInUser: string) => {
        this.loggedInUser = loggedInUser;
      },
      error: (error: any) => {
        this.loggedInUser = '';
        this.commonService.logger(error);
      },
    });
  }
}
