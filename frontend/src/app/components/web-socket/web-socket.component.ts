import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
/**
 * This component is used to show the message from the connected websocket.
 */
@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css'],
})
export class WebSocketComponent implements OnInit {
  /**
   * This is the constructor of this component.
   * @param backendService is used to make the API call to the backend.
   */
  constructor(private backendService: BackendService) {}

  /**
   * This is the message from the connected websocket. It is initialized with an empty string.
   * @type {string}
   * @default ''
   */
  message: string = '';

  /**
   * This method is used to initialize the component. It will connect to the websocket.
   * It will subscribe to the [handleGetWebSocketData]{@link BackendService#handleGetWebSocketData} to get the message from the websocket. It will update the [message]{@link message} with the data received from the websocket.
   * For error, it will log the error in the console.
   */
  ngOnInit(): void {}
}
