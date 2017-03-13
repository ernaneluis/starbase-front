import { Component, OnInit } from '@angular/core';

import { EtherscanService } from '../service/etherscan.service';
import { EtherwebsocketService } from '../service/etherwebsocket.service';
import { TickerwebsocketService } from '../service/tickerwebsocket.service';

import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';

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
  bookmarks: any;
  private subscribe:any;
  isBookmarkSaved: any;
  priceUSD: any;

  constructor(private ether: EtherscanService,
    private etherws: EtherwebsocketService,
    private tickerws: TickerwebsocketService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit()
  {

        // Subscribe to route params
        this.subscribe = this.route.params.subscribe(params => {

          this.address = params['id'];

          this.ether.getTransactionsFromAddress(this.address).then( (data) => {

            this.transactions = data
            this.total = this.transactions.length

          })

          this.ether.getBalanceFromAddress(this.address).then( (data) => {
            console.log("balance " + data)
            this.balance = data
          })

          this.bookmarks = this.localStorageService.get("bookmarks");

          this.isBookmarkSaved = this.bookmarkSaved(this.address)

          this.etherws.sendSubscribe(this.address).subscribe((data) => {
            let array = [data]
            this.transactions = array.concat(this.transactions)
          })

          this.tickerws.sendSubscribe(this.address).subscribe((data) => {
            this.priceUSD = data
            // this.transactions = array.concat(this.transactions)
          })
          // console.log(this.etherws)

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
    // let strg =  Number(value)/(10**18)
    return value.toFixed(2)
  }


  setBookmark(trx)
  {
      console.log("save bookmark")

      let book = <Array<any>> this.localStorageService.get("bookmarks");
      //check if is the first time seting the bookmark key
      if(book == null)
      {
        book = [trx]
      }
      else
      {
        // let trx = trx.toString()
        //check if element exist already
        let index = book.indexOf(trx)
        //not found
        if(index == -1)
        {
            //just add new bookmarks
            book = book.concat(trx)
        }


      }

      //save it
      this.localStorageService.set("bookmarks", book);
      //update the model view
      this.bookmarks = book

      this.isBookmarkSaved = this.bookmarkSaved(trx)
  }

  removeBookmark(trx)
  {
    console.log("remove bookmark " + trx)
    let book = <Array<any>> this.localStorageService.get("bookmarks");
    let index = book.indexOf(trx)

    if (index > -1) {
      //found  element

      //delete element
      book.splice(index, 1);
      //save it
      this.localStorageService.set("bookmarks", book);
      //update the model view
      this.bookmarks = book

      this.isBookmarkSaved = this.bookmarkSaved(trx)
    }

  }

  bookmarkSaved(trx)
  {
    let book = <Array<any>> this.localStorageService.get("bookmarks");
    let index = book.indexOf(trx)
    return (index == -1)? false : true ;
  }




}
