import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { appConstant } from 'src/constants/app.constant';

/**
 * This is the root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  /**
   * This is the constructor of the root component.
   * @param { CommonService } commonService is used to update the loader status.
   */
  constructor(private commonService: CommonService) {}

  /**
   * This is used to show the loader on the screen. It will be shown when the value is true.
   * @default false
   * @type { boolean }
   */
  loaderStatus: boolean = false;

  /**
   * This is the title of the application. It will be shown on the browser tab.
   * @type { string }
   */
  title: string = appConstant.appName;

  /**
   * This method is used to initialize the root component. It will check if the user is already logged in or not, to handle the page refresh and direct URL access. It will also subscribe to the [loaderSubject]{@link CommonService#loaderSubject} to update the [loaderStatus]{@link loaderStatus}.
   */
  ngOnInit(): void {
    this.commonService.checkSavedCredentials();
    this.commonService.loaderSubject$.subscribe((loaderStatus: boolean) => {
      this.loaderStatus = loaderStatus;
    });
  }
}
