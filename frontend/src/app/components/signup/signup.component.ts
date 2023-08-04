import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { signUp } from 'src/app/models/signUp.model';
import { BackendService } from 'src/app/services/backend.service';
import { CommonService } from 'src/app/services/common.service';

/**
 * This component is used to show the sign up page on the screen. It is used to create a new user.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  /**
   * This is the constructor of this component.
   * @param backendService is used to make the API call to the backend.
   * @param commonService is used to show the notification and loader on the screen.
   * @param router is used here to navigate the user to the post data screen after successful sign up.
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
   * This is the email of the user. It is initialized with an empty string. It is optional.
   * @optional
   * @type {string}
   * @default ''
   */
  email: string = '';

  /**
   * This method is used to handle the sign up button click. It will call the [handleSignUp]{@link BackendService#handleSignUp} method.
   * It will show the loader on the screen while the API call is in progress. After the API call is completed, it will hide the loader. It will show the notification on the screen based on the response from the backend.
   * It subscribes to the [handleSignUp]{@link BackendService#handleSignUp} to sign up the user. It will update the [token]{@link CommonService#token} and [username]{@link CommonService#username} in the [commonService]{@link CommonService} based on the response from the backend.
   * For error, it will show the error message on the screen and log the error in the console.
   * After successful sign up, it will navigate the user to the post data screen.
   */
  handleSignUp() {
    /**
     * Creating the data object to be sent to the backend.
     * @type {signUp}
     */
    const data: signUp = {
      username: this.username,
      password: this.password,
      email: this.email ? this.email : undefined,
    };
    this.commonService.updateLoaderSubject(true);
    this.backendService
      .handleSignUp(data)
      .pipe(
        finalize(() => {
          this.commonService.updateLoaderSubject(false);
        })
      )
      .subscribe({
        next: (response: any) => {
          const accessToken: string = response.headers.get('Authorization');
          this.commonService.token = accessToken;
          const decodedToken = this.commonService.decodeToken(accessToken);
          this.commonService.username = decodedToken?.username;
          this.router.navigate(['/post-data']);

          this.commonService.updateNotificationSubject(
            response?.message || 'Success'
          );
        },
        error: (error: any) => {
          this.commonService.logger(error);
          this.commonService.updateNotificationSubject(
            error.error?.message || 'Error'
          );
        },
      });
  }
}
