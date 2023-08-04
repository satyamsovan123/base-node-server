import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignIn } from '../models/SignIn.model';
import { SignUp } from '../models/SignUp.model';
import { RequestData } from '../models/RequestData.model';

import { apiPathConstant } from 'src/constants/apiPath.constant';

/**
 * This is the service class for the backend. It is used to make the API calls to the backend. It is injected in the [app.module.ts]{@link AppModule} file as it is used in the whole application for making the API calls.
 */
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  /**
   * This is the constructor of the service class.
   * @param {HttpClient} httpClient is used to make the API calls.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * This is the URL for the backend. This will be picked from the current environment.
   * @type {string}
   */
  backendUrl: string = environment.backendUrl;

  /**
   * This is the URL for the websocket. This will be picked from the current environment.
   * @type {string}
   */
  websocketUrl: string = environment.backendUrl;

  /**
   * This method is used to handle the sign in API call to the backend. It uses POST method to send the data to the backend. It signs in existing users.
   * @param {SignIn} data is the data to be sent to the backend.
   * @returns the response from the backend in the form of an observable. Normally, the response body is returned by the API call. But, in this case, response header values are required for getting authorization token set by backend. Therefore, setting the observe: 'response' option.
   */
  handleSignIn(data: SignIn) {
    return this.httpClient.post(
      this.backendUrl + apiPathConstant.signIn,
      data,
      {
        observe: 'response',
      }
    );
  }

  /**
   * This method is used to handle the sign up API call to the backend. It uses post method to send the data to the backend. It creates a new user.
   * @param {SignUp} data
   * @returns the response from the backend in the form of an observable. Normally, the response body is returned by the API call. But, in this case, response header values are required for getting authorization token set by backend. Therefore, setting the observe: 'response' option.
   */
  handleSignUp(data: SignUp) {
    return this.httpClient.post(
      this.backendUrl + apiPathConstant.signUp,
      data,
      {
        observe: 'response',
      }
    );
  }

  /**
   * This method is used to handle the sign out API call to the backend. It uses get method to send the data to the backend. It signs out the logged in user.
   * @returns the response from the backend in the form of an observable. Normally, the response body is returned by the API call. But, in this case, response header values are required for getting authorization token set by backend. Therefore, setting the observe: 'response' option.
   */
  handleSignOut() {
    return this.httpClient.get(this.backendUrl + apiPathConstant.signOut, {
      observe: 'response',
    });
  }

  /**
   * This method is used to get all the data from the backend. This uses pagination.
   * @param {number} currentOffset is the current offset. It is used to get the data from the backend. It will be the marker for the subsequent API call. This is passed as a query parameter to the backend.
   * @returns the response from the backend in the form of an observable.
   */
  handleGetData(currentOffset: number) {
    return this.httpClient.get(
      this.backendUrl + apiPathConstant.data + `?offset=${currentOffset}`
    );
  }

  /**
   * @param {RequestData} data is the data to be sent to the backend.
   * @returns the response from the backend in the form of an observable.
   */
  handlePostData(data: RequestData) {
    return this.httpClient.post(this.backendUrl + apiPathConstant.data, data);
  }

  /**
   * This method is used to get message from websocket.
   */
  handleGetWebSocketData() {
    return 'Hello World!';
  }
}
