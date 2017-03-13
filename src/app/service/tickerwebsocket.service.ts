import { Injectable } from '@angular/core';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

import { Observable } from 'rxjs/Observable';

const CHAT_URL = 'wss://api.bitfinex.com/ws';

@Injectable()
export class TickerwebsocketService {

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

    return Observable.create(observer => {

            this.ws.onMessage(
              (msg: MessageEvent)=> {
                  let data = JSON.parse(msg.data)
                  if(Array.isArray(data))
                  {
                      if(data.length > 2)
                      {
                        console.log("Return TICKER: ", data[7]);
                        observer.next(data[7]);
                      }

                  }
              },
              {autoApply: false}
            );


            let data = {
              event:"subscribe",
              channel:"ticker",
              pair:"ETHUSD"
            }


            this.ws.send(JSON.stringify(data)).subscribe(
              (msg)=> {
                  console.log("next", msg.data);
              },
              (msg)=> {
                  console.log("error", msg);
              }
          );

      });

  }

  sendPing(socket)
  {

      let data = { event: "ping"}
      console.log("TICKER: " + JSON.stringify(data))
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
