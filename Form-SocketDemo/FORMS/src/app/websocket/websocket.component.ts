import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../shared/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {

  constructor(private wsService: WebsocketService) {
  }

  ngOnInit() {
    // 订阅了服务器发送的流并打印在控制台上
    this.wsService.createObservableSocket('ws://localhost:8085')
        .subscribe(
          data => {
            console.log(data)
          },
          err => {
            console.log(err)
          },
          () => {
            console.log('流已经结束了');
          }
        )
  }

  sendMessageToServer() {
    this.wsService.sendMessage('Hello from client');
  }

}
