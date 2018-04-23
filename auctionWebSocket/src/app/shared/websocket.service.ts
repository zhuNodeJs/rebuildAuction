import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  ws: WebSocket;

  constructor() { }

  createObservableSocket(url: string, id: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMessage({productId: id});
        return () => this.ws.close(); // 这个匿名函数取消订阅的方法的时候调用，关闭WebSocket;
      }
    )
  }

  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message)); // 穿过来的参数是对象，但是send消息的格式是字符串格式的；
  }

}
