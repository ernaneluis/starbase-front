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
      let seconds20 = 20000
      let ping  = setInterval(this.sendPing, seconds20, this.ws);
  }

  sendSubscribe(address)
  {
    // return new Promise(resolve => {

    return Observable.create(observer => {

            this.ws.onMessage(
              (msg: MessageEvent)=> {
                  console.log("EtherScan Socket ", msg.data);

                  let data = JSON.parse(msg.data)
                  if(data.event == "txlist")
                  {
                      observer.next(data["result"]);
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
