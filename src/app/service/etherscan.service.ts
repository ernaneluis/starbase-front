import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EtherscanService {


  key:string;
  base:string;

  constructor(public http: Http) {

    this.key = "U373HBG2SB28UXCUZ1ZYGY1X75IEPKPEZC"
    this.base = "http://api.etherscan.io/api"

  }


  getTransactionsFromAddress(address)
  {

      return new Promise(resolve => {

          var url  = this.base
          url += "?module=account&action=txlist"
          url += "&address=" + address
          url += "&startblock=0"
          url += "&endblock=99999999"
          url += "&sort=desc"
          url += "&apikey=" + this.key

           console.log(url)

           this.http.get(url)
             .map(res => res.json())
             .subscribe(data => {

               if(data.message == "OK")
               {
                 resolve(data["result"]);
               }
               else {
                 resolve(null)
               }


             });
          });

    }


    getBalanceFromAddress(address)
    {

        return new Promise(resolve => {

            var url  = this.base
            url += "?module=account&action=balance"
            url += "&address=" + address
            url += "&tag=latest"
            url += "&apikey=" + this.key

             console.log(url)

             this.http.get(url)
               .map(res => res.json())
               .subscribe(data => {

                 if(data.message == "OK")
                 {
                   resolve(data["result"]);
                 }
                 else {
                   resolve(null)
                 }


               });
            });

      }

}
