import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { BackendService } from './backend.service';
import { environment } from 'src/environments/environment';
import { decodedJWT } from '../models/decodedJWT.model';

/**
 * This is the common service. It has the methods and shared observables that are used throughout the application. Therefore, it is injected in the [app.module.ts]{@link AppModule} file.
 */
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  /**
   * This is the constructor of the [CommonService]{@link CommonService} class.
   * @param {Router} router is used to navigate the user to different pages.
   * @param {BackendService} backendService is used to call the backend APIs.
   */
  constructor(private router: Router, private backendService: BackendService) {}

  /**
   * This is the loader subject. It is used to show the loader on the screen. It is initialized with `false`.
   * @type {BehaviorSubject<boolean>}
   */
  loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * This is the loader subject observable. This is used to subscribe to the [loaderSubject]{@link loaderSubject}.
   */
  loaderSubject$ = this.loaderSubject.asObservable();

  /**
   * This method is used to update the [loaderSubject]{@link loaderSubject}. It will update the [loaderSubject]{@link loaderSubject} with the value of the `loaderState` parameter.
   * @param {boolean} loaderState is the state of the loader.
   * @example
   * updateLoaderSubject(true); // This will update the loaderSubject with true.
   */
  updateLoaderSubject(loaderState: boolean) {
    this.loaderSubject.next(loaderState);
  }

  /**
   * This is the notification subject. It is used to show the notification on the screen. It is initialized with an empty string.
   * @type {BehaviorSubject<string>}
   * @example
   * notificationSubject.subscribe((notification: string) => {
   *  // Do something with the notification.
   * });
   */
  notificationSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  /**
   * This is the notification subject observable. This is used to subscribe to the [notificationSubject]{@link notificationSubject}.
   */
  notificationSubject$ = this.notificationSubject.asObservable();

  /**
   * This method is used to update the [notificationSubject]{@link notificationSubject}. It will update the [notificationSubject]{@link notificationSubject} with the value of the `notification` parameter.
   * @param {string} notification is the notification to be shown on the screen.
   * @example
   * updateNotificationSubject(`Hello world!`); // This will update the notificationSubject with 'Hello world!'.
   */
  updateNotificationSubject(notification: string) {
    this.notificationSubject.next(notification);
  }

  /**
   * This is the logged in user subject. It is used to show the logged in user's name on the screen. It is initialized with an empty string.
   * @type {BehaviorSubject<string>}
   * @example
   * loggedInUserSubject.subscribe((loggedInUser: string) => {
   * // Do something with the logged in user name.
   * });
   */
  loggedInUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  /**
   * This is the logged in user subject observable. This is used to subscribe to the [loggedInUserSubject]{@link loggedInUserSubject}.
   */
  loggedInUserSubject$ = this.loggedInUserSubject.asObservable();

  /**
   * This method is used to update the [loggedInUserSubject]{@link loggedInUserSubject}. It will update the [loggedInUserSubject]{@link loggedInUserSubject} with the value of the `loggedInUser` parameter.
   * @param {string} loggedInUser is the logged in user's name which is to be shown on the screen.
   * @example
   * updateLoggedInUserSubject(`John Doe`); // This will update the loggedInUserSubject with 'John Doe'.
   */
  updateLoggedInUserSubject(loggedInUser: string) {
    this.loggedInUserSubject.next(loggedInUser);
  }

  /**
   * This is used to set the token in the session storage.
   * @param {string} token is the token to be set.
   */
  set token(token: string) {
    sessionStorage.setItem('Authorization', token);
  }

  /**
   * This is used to get the token from the session storage. If the token is not present in the session storage, it will return an empty string.
   * @type {string}
   */
  get token(): string {
    return sessionStorage.getItem('Authorization') || '';
  }

  /**
   * This method is used to sign out the signed in user. It will call the [handleSignOut]{@link BackendService#handleSignOut} method. It will also clear the token and username from the session storage. After that, it will navigate the user to the sign in page.
   */
  signOut() {
    /**
     * Resetting the token and username.
     */
    this.updateLoaderSubject(true);
    this.token = '';
    this.username = '';
    sessionStorage.removeItem('Authorization');
    sessionStorage.removeItem('username');

    /**
     * Calling the [handleSignOut]{@link handleSignOut} method of the [backendService]{@link BackendService}. If the sign out is successful, it will update the [notificationSubject]{@link notificationSubject} with the message from the response. If an error occurs, it will update the [notificationSubject]{@link notificationSubject} with the error message.
     */
    this.backendService
      .handleSignOut()
      .pipe(
        finalize(() => {
          this.updateLoaderSubject(false);
          this.router.navigate(['/signin']);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.updateNotificationSubject(response?.body?.message || 'Success');
        },
        error: (error: any) => {
          this.logger(error);
          this.updateNotificationSubject(error.error?.message || 'Error');
        },
      });
  }

  /**
   * This method is used to decode the JWT. It will return the decoded JWT. If the token is empty, it will return default response. If while decoding the JWT, an error occurs, it will call the [signOut]{@link signOut} method and return default response.
   * @param token is the JWT to be decoded.
   * @example
   * decodeToken(jwt);
   * @returns { decodedJWT } the decoded JWT.
   */
  decodeToken(token: string): decodedJWT {
    /**
     * This is the default response. It will be returned if the token is empty or if an error occurs while decoding the JWT.
     * @type { decodedJWT }
     */
    let response: decodedJWT = {
      exp: 0,
      iat: 0,
      username: '',
    };

    /**
     * If the token is empty, returning the default response.
     */
    if (!token) {
      return response;
    }
    /**
     * Trying to decode the JWT. If an error occurs, calling the [signOut]{@link signOut} method and returning the default response.
     */
    try {
      const jwtPayload: string = token.split('.')[1];
      const base64: string = jwtPayload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload: any = JSON.parse(atob(base64));
      response = decodedPayload;
      return decodedPayload;
    } catch (error) {
      this.signOut();
      this.logger(error);
      return response;
    }
  }

  /**
   * This is used to set the username in the session storage. It will also update the [loggedInUserSubject]{@link loggedInUserSubject}.
   * @param {string} username is the username to be set.
   */
  set username(username: string) {
    this.updateLoggedInUserSubject(username);
    sessionStorage.setItem('username', username);
  }

  /**
   * This is used to get the username from the session storage. If the username is not present in the session storage, it will return an empty string.
   * @type {string}
   */
  get username(): string {
    return sessionStorage.getItem('username') || '';
  }

  /**
   * This method is used to check if the user has already signed in. It will check if the token and username are present in the session storage. If they are present, it will set the [token]{@link token} and [username]{@link username}.
   * For additional security, it will also check if the username in the token matches the username in the session storage. If they do not match, it will call the [signOut]{@link signOut} method.
   * It will try to decode the token. If an error occurs while decoding the token, it will call the [signOut]{@link signOut} method.
   */
  checkSavedCredentials() {
    try {
      const sessionStorageToken = sessionStorage.getItem('Authorization');
      const sessionStorageUsername = sessionStorage.getItem('username');

      const decodedToken: decodedJWT = this.decodeToken(
        sessionStorageToken || ''
      );

      /**
       * If the decoded token has username as empty, calling the [signOut]{@link signOut} method.
       * If the username in the token does not match the username in the session storage, calling the [signOut]{@link signOut} method.
       */
      if (
        !decodedToken.username ||
        (decodedToken.username &&
          decodedToken.username !== sessionStorageUsername)
      ) {
        this.signOut();
        return;
      }

      /**
       * If the token and username are present in the session storage, setting the [token]{@link token} and [username]{@link username}. This would handle the case when the user has already signed in and has not signed out i.e the user has closed the browser tab and opened the application again or the user has refreshed the page.
       */
      if (sessionStorageToken && sessionStorageUsername) {
        this.token = sessionStorageToken;
        this.username = sessionStorageUsername;
      }
    } catch (error) {
      this.signOut();
      this.logger(error);
    }
  }

  /**
   * This method is used to log messages to the console. It will not log anything in production mode. It will also not log anything if the message is empty.
   * @param {any} message is the message to be logged.
   * @example
   * logger(`Something happened.`); // This will log 'Something happened.' to the console.
   */
  logger(message: any) {
    if (environment.production || !message) {
      return;
    }
    console.log(message);
  }
}
