import { Component, OnDestroy } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { ResponseData } from 'src/app/models/ResponseData.model';
import { BackendService } from 'src/app/services/backend.service';
import { CommonService } from 'src/app/services/common.service';
import { appConstant } from 'src/constants/app.constant';

/**
 * This component is used to show all the data from the backend.
 */
@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css'],
})
export class GetDataComponent implements OnDestroy {
  /**
   * This is the constructor of this component.
   * @param backendService is used to make the API call to the backend.
   * @param commonService is used to show the notification and loader on the screen.
   */
  constructor(
    private backendService: BackendService,
    private commonService: CommonService
  ) {}

  /**
   * This is the data to be shown on the screen. It is initialized with an empty array.
   * @type {[]ResponseData}
   * @default []
   */
  data: ResponseData[] = [];

  /**
   * This is the subscription that would be used in this component. It is initialized with an empty subscription.
   * @type {Subscription}
   * @private
   */
  private subscription!: Subscription;

  /**
   * This method is used to get all the data from the backend. It will call the [handleGetData]{@link BackendService#handleGetData} method.
   * It will show the loader on the screen while the API call is in progress. After the API call is completed, it will hide the loader. It will show the notification on the screen based on the response from the backend.
   * It subscribes to the [handleGetData]{@link BackendService#handleGetData} to get the data from the backend. It will update the [data]{@link data} with the data received from the backend. For error, it will reset data variable, show the error message on the screen and log the error in the console.
   * If the user is not logged in or the token is expired, then it will sign out the user.
   */
  handleGetData(): void {
    this.commonService.updateLoaderSubject(true);
    this.subscription = this.backendService
      .handleGetData()
      .pipe(
        finalize(() => {
          this.commonService.updateLoaderSubject(false);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.commonService.logger(response.data);
          this.data = response.data;
          this.commonService.updateNotificationSubject(
            response?.message ||
              `${appConstant.success} ${appConstant.getData}.`
          );
        },
        error: (error: any) => {
          this.data = [];
          this.commonService.logger(error);
          this.commonService.updateNotificationSubject(
            error.error?.message ||
              `${appConstant.error} ${appConstant.getData}.`
          );

          if (error?.status === 401) {
            this.commonService.signOut();
          }
        },
      });
  }

  /**
   * This method is used to format the date in the format DD/MM/YYYY, HH:MM:SS AM/PM. It will return an empty string if the date is not present or if the date is invalid.
   * @param {Date} date is the date to be formatted in UTC format.
   * @example
   * formatDate('2023-08-01T21:08:40.472Z'); // This will return '8/2/2023, 2:38:40 AM'.
   * @returns the date in the format DD/MM/YYYY, HH:MM:SS AM/PM.
   */
  formatDate(date: Date): string {
    try {
      if (!date) {
        return '';
      }
      return new Date(date).toLocaleString();
    } catch {
      return '';
    }
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
