import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { appConstant } from 'src/constants/app.constant';

/**
 * This component is used to show the notification on the screen.
 */
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  /**
   * This is the constructor of this component.
   * @param commonService is used to subscribe to the [notificationSubject]{@link CommonService#notificationSubject}.
   */
  constructor(private commonService: CommonService) {}

  /**
   * This is the notification to be shown on the screen. It is initialized with an empty string.
   * @type {string}
   * @default ''
   */
  notification: string = '';

  /**
   * This method is used to initialize the component. It will subscribe to the [notificationSubject]{@link CommonService#notificationSubject} to get the updated notification to be shown on the screen.
   */
  ngOnInit(): void {
    this.commonService.notificationSubject$.subscribe((notification: any) => {
      this.notification = notification;
      /**
       * This is used to hide the notification after a certain time.
       */
      setTimeout(() => {
        this.notification = '';
      }, appConstant.hideNotifcationAfter);
    });
  }
}
