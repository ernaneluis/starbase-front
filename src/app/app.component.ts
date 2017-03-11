import { Component } from '@angular/core';
import { EtherscanService } from './service/etherscan.service';

import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  transaction : any;

  constructor(private ether: EtherscanService, private route: ActivatedRoute,private router: Router) {
    // this.title = 'app works!';



  }

  // Load data ones componet is ready
  ngOnInit() {

  }

  onSubmit(): void {
     // code that happens when form is submitted
     // then reset the form
    //  this.reset();
    this.router.navigate(['./transaction/'+this.transaction]);
    console.log(this.transaction)
 }





}
