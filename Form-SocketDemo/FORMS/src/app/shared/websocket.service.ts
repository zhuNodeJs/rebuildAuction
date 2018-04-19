import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class WebsocketService {

  ws: WebSocket;

  constructor() { }

  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data); //next发送元素
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
      }
    )
  }

  sendMessage(message: string) {
    this.ws.send(message);
  }

}
