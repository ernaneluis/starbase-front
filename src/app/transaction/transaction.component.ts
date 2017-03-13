import { Component, OnInit } from '@angular/core';

import { EtherscanService } from '../service/etherscan.service';
import { EtherwebsocketService } from '../service/etherwebsocket.service';
import { TickerwebsocketService } from '../service/tickerwebsocket.service';
import { BookmarkService } from '../service/bookmark.service';

import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit
{

  transactions: any;
  address: any;
  balance: any;
  total: any;

  private subscribe:any;
  isBookmarkSaved: any;
  priceUSD: any;

  constructor(private ether: EtherscanService,
    private etherws: EtherwebsocketService,
    private tickerws: TickerwebsocketService,
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService) {

  }

  ngOnInit()
  {

        // Subscribe to route params
        this.subscribe = this.route.params.subscribe(params => {

          this.address = params['id'];

          //etherscan http request for transactions
          this.ether.getTransactionsFromAddress(this.address).then( (data) => {
            this.transactions = data
            if(this.transactions != null)
              this.total = this.transactions.length
          })

          //etherscan http request for address balance
          this.ether.getBalanceFromAddress(this.address).then( (data) => {
            console.log("balance " + data)
            this.balance = data
          })

          //etherscan websocket for new transactions
          this.etherws.sendSubscribe(this.address).subscribe((data) => {
            let array = data
            this.transactions = array.concat(this.transactions)
          })

          //tickerws websocket for ether price in usd
          this.tickerws.sendSubscribe(this.address).subscribe((data) => {
            this.priceUSD = data
          })

          //boolean value
          this.isBookmarkSaved = this.bookmarkService.isBookmarkSaved(this.address)

      });
  }


  toDate(timestamp)
  {
    return new Date(timestamp*1000)
  }

  toEther(value)
  {
    let strg =  Number(value)/(10**18)
    return strg.toFixed(8)
  }

  toUSD(value)
  {
    return value.toFixed(2)
  }


  setBookmark(trx)
  {
      console.log("save bookmark")
      this.bookmarkService.setBookmark(trx)
      this.isBookmarkSaved = this.bookmarkService.isBookmarkSaved(trx)
  }

  removeBookmark(trx)
  {
    console.log("remove Bookmark")
    this.bookmarkService.removeBookmark(trx)
    this.isBookmarkSaved = this.bookmarkService.isBookmarkSaved(trx)
  }



}
