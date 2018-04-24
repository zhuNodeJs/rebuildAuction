import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class WebsocketService {

  ws: WebSocket;

  constructor() { }

  // 通过url来创建websocket流, 返回可观测的流
  createObservableSocket(url: string, id: number): Observable<any> {
    this.ws = new WebSocket(url); // 创建连接
    return new Observable( // 返回可观测的流
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data); // 推送内容
        this.ws.onerror = (event) => observer.error(event); // 当发生错误时，推送错误消息
        this.ws.onclose = (event) => observer.complete(); // 当关闭时，可观察对象的完毕
        this.ws.onopen = (event) => this.sendMessage({productId: id}); // 当ws打开时，即通过函数sendMessage发送数据
        return () => this.ws.close(); // 这个匿名函数取消订阅的方法的时候调用，关闭WebSocket, 否则的话，容易造成内存的泄露;
      }
    )
  }

  // 通过创建的ws对象，来发送数据，发送的数据的格式是字符串的格式
  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message)); // 穿过来的参数是对象，但是send消息的格式是字符串格式的；
  }

}
