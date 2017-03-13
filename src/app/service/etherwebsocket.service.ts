import { Injectable } from '@angular/core';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

import { Observable } from 'rxjs/Observable';

const CHAT_URL = 'wss://socket.etherscan.io/wshandler';

@Injectable()
export class EtherwebsocketService {

  public ws: any;

  constructor()
  {

      this.ws = new $WebSocket(CHAT_URL);
      // you can send immediately after connect,
      // data will cached until connect open and immediately send or connect fail.

      // when connect fail, websocket will reconnect or not,
      // you can set {WebSocketConfig.reconnectIfNotNormalClose = true} to enable auto reconnect
      // all cached data will lost when connect close if not reconnect

      // set received message callback

      let seconds20 = 20000
      let ping  = setInterval(this.sendPing, seconds20, this.ws);

  }

  sendSubscribe(address)
  {
    // return new Promise(resolve => {

    return Observable.create(observer => {

            this.ws.onMessage(
              (msg: MessageEvent)=> {
                  console.log("onMessage ", msg.data);

                  if(msg.data.event == "txlist")
                  {
                      // return msg.data["result"];
                      observer.next(msg.data["result"]);
                      observer.complete();
                  }
              },
              {autoApply: false}
            );


            let data = {
              event:"txlist",
              address: address
            }

            this.ws.send(JSON.stringify(data)).subscribe(
              (msg)=> {
                  console.log("next", msg.data);
              },
              (msg)=> {
                  console.log("error subscribe", msg);
              }
          );

      });//end Observable
      // })//end promise

  }

  sendPing(socket)
  {

      let data = { event: "ping"}
      console.log(JSON.stringify(data))
      socket.send(JSON.stringify(data)).subscribe(
          (msg)=> {
              console.log("next", msg.data);
          },
          (msg)=> {
              console.log("error", msg);
          }
      );
  }

}
