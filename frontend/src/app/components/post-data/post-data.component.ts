import { Component, OnDestroy } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { RequestData } from 'src/app/models/RequestData.model';
import { BackendService } from 'src/app/services/backend.service';
import { CommonService } from 'src/app/services/common.service';
import { appConstant } from 'src/constants/app.constant';

/**
 * This component is used to show form to send new data form on the screen to backend.
 */
@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css'],
})
export class PostDataComponent implements OnDestroy {
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
   * This is the article that is needed to be sent to the backend. It is initialized with an empty string.
   * @type {string}
   * @default ''
   */
  article: string = '';

  /**
   * This is the title that is needed to be sent to the backend. It is initialized with an empty string.
   * @type {string}
   * @default ''
   */
  title: string = '';

  /**
   * This is the subscription that would be used in this component. It is initialized with an empty subscription.
   * @type {Subscription}
   * @private
   */
  private subscription!: Subscription;

  /**
   * This method is used to handle sending data to the backend. It will call the [handlePostData]{@link BackendService#handlePostData} method.
   * It will show the loader on the screen while the API call is in progress. After the API call is completed, it will hide the loader. It will show the notification on the screen based on the response from the backend.
   * It subscribes to the [handlePostData]{@link BackendService#handlePostData} to sennd the data to the backend. For error, it will show the error message on the screen and log the error in the console.
   * If the user is not logged in or the token is expired, then it will sign out the user.
   */
  handlePostData() {
    /**
     * This is the data to be sent to the backend.
     * @type {RequestData}
     */
    const data: RequestData = {
      title: this.title,
      article: this.article,
    };
    this.commonService.updateLoaderSubject(true);
    this.subscription = this.backendService
      .handlePostData(data)
      .pipe(
        finalize(() => {
          this.commonService.updateLoaderSubject(false);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.commonService.logger(response);
          this.commonService.updateNotificationSubject(
            response?.message ||
              `${appConstant.success} ${appConstant.postData}.`
          );
        },
        error: (error: any) => {
          this.commonService.logger(error);
          this.commonService.updateNotificationSubject(
            error.error?.message ||
              `${appConstant.error} ${appConstant.postData}.`
          );

          if (error?.status === 401) {
            this.commonService.signOut();
          }
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
