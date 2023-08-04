import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from './common.service';

/**
 * This is the auth guard service class. It is used to check if the user is logged in or not logged in.
 * This auth guard is used to protect the get data screen and post data screen.
 */
@Injectable()
export class AuthGuard {
  /**
   * This is the constructor of the auth guard class.
   * @param commonService is used to get the [loggedInUserSubject]{@link CommonService#loggedInUserSubject} observable. It is used to check if the user is logged in or not logged in.
   */
  constructor(private commonService: CommonService) {}

  /**
   * This method is used to check if the user is logged in or not logged in. It will return true if the user is logged in, else, it will return false.
   * This auth guard is used to protect the get data and post data routes.
   * @param route is the route to be activated i.e. the route user is trying to access.
   * @param state is the state of the route to be activated
   * @returns a boolean value. If the user is logged in, returning true, else, returning false.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    /**
     * By default, assuming that the user is not logged in.
     */
    let value: boolean = false;
    /**
     * Subscribing to the [loggedInUserSubject]{@link CommonService#loggedInUserSubject} observable.
     * If the user is logged in it would mean that user has a username stored in loggedInUserSubject.
     * If the user is logged in, updating the value to true. For any error, logging the error.
     */
    this.commonService.loggedInUserSubject.subscribe({
      next: (loggedInUser: string) => {
        if (loggedInUser.length > 0) {
          value = true;
        }
      },
      error: (error: any) => {
        this.commonService.logger(error);
      },
    });
    return value;
  }
}
