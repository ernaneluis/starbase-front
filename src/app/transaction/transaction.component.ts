import { Component, OnInit } from '@angular/core';

import { EtherscanService } from '../service/etherscan.service';

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
  transaction: any;
  balance: any;
  total: any;
  bookmarks: any;
  private subscribe:any;

  constructor(private ether: EtherscanService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit()
  {

        // Subscribe to route params
        this.subscribe = this.route.params.subscribe(params => {

          this.transaction = params['id'];

          this.ether.getTransactionsFromAddress(this.transaction).then( (data) => {
            console.log(data)
            this.transactions = data
            this.total = this.transactions.length
          })

          this.ether.getBalanceFromAddress(this.transaction).then( (data) => {
            console.log(data)
            this.balance = data
          })

          this.bookmarks = this.localStorageService.get("bookmarks");

      });
  }


  toDate(timestamp)
  {
    return new Date(timestamp*1000)
  }

  toValue(value)
  {
    let strg =  Number(value)/(10**18)
    return strg.toFixed(8)
  }


  setBookmark()
  {
      console.log("save bookmark")

      let book = <Array<any>> this.localStorageService.get("bookmarks");
      if(book == null)
      {
        book = [this.transaction]
      }
      else {
        let trx = this.transaction.toString()
        book = book.concat(trx)
      }

      this.localStorageService.set("bookmarks", book);
  }

}
