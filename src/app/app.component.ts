import { Component } from '@angular/core';
// import { EtherscanService } from './service/etherscan.service';
import { TickerwebsocketService } from './service/tickerwebsocket.service';

import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  address : any;
  priceUSD = 0.00;

  constructor(private tickerws: TickerwebsocketService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit()
  {

    //tickerws websocket for ether price in usd
    this.tickerws.sendSubscribe(this.address).subscribe((data) => {
      this.priceUSD = data
    })

  }

  onSubmit(): void {
     // code that happens when form is submitted
    this.router.navigate(['./address/'+this.address]);
    console.log(this.address)
 }





}
