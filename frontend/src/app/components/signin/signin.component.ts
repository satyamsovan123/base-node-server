import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { SignIn } from 'src/app/models/SignIn.model';
import { BackendService } from 'src/app/services/backend.service';
import { CommonService } from 'src/app/services/common.service';
import { appConstant } from 'src/constants/app.constant';

/**
 * This component is used to show the sign in page on the screen. It is used to sign in the existing users.
 */
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnDestroy {
  /**
   * This is the constructor of this component.
   * @param backendService is used to make the API call to the backend.
   * @param commonService is used to show the notification and loader on the screen.
   * @param router is used here to navigate the user to get data screen after successful sign in.
   */
  constructor(
    private backendService: BackendService,
    private commonService: CommonService,
    private router: Router
  ) {}

  /**
   * This is the username of the user. It is initialized with an empty string.
   * @type {string}
   * @default ''
   */
  username: string = '';

  /**
   * This is the password of the user. It is initialized with an empty string.
   * @type {string}
   * @default ''
   */
  password: string = '';

  /**
   * This is the subscription that would be used in this component. It is initialized with an empty subscription.
   * @type {Subscription}
   * @private
   */
  private subscription!: Subscription;

  /**
   * This method is used to sign in the existing user. It will call the [handleSignIn]{@link BackendService#handleSignIn} method.
   * It will show the loader on the screen while the API call is in progress. After the API call is completed, it will hide the loader. It will show the notification on the screen based on the response from the backend.
   * It subscribes to the [handleSignIn]{@link BackendService#handleSignIn} to get the data from the backend. It will update the [token]{@link CommonService#token} and [username]{@link CommonService#username} with the data received from the backend.
   * For error, it will show the error message on the screen and log the error in the console.
   * After successful sign in, it will navigate the user to the get data screen.
   */
  handleSignIn() {
    /**
     * Creating the data to be sent to the backend.
     * @type {SignIn}
     */
    const data: SignIn = {
      username: this.username,
      password: this.password,
    };
    this.commonService.updateLoaderSubject(true);
    this.subscription = this.backendService
      .handleSignIn(data)
      .pipe(
        finalize(() => {
          this.commonService.updateLoaderSubject(false);
        })
      )
      .subscribe({
        next: (response: any) => {
          const accessToken: string = response.headers.get(
            appConstant.authorizationHeaderKey
          );
          this.commonService.token = accessToken;
          const decodedToken = this.commonService.decodeToken(accessToken);
          this.commonService.logger(decodedToken);
          this.commonService.username = decodedToken?.username;
          this.router.navigate(['/get-data']);

          this.commonService.updateNotificationSubject(
            response?.body?.message ||
              `${appConstant.success} ${appConstant.signIn}.`
          );
        },
        error: (error: any) => {
          this.commonService.logger(error);
          this.commonService.updateNotificationSubject(
            error.error?.message ||
              `${appConstant.error} ${appConstant.signIn}.`
          );
        },
      });
  }

  /**
   * This is called when the component is destroyed. It will unsubscribe from the subscription if it is present.
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
