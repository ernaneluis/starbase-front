import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  address : any;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
  }

  onSubmit(): void {
     // code that happens when form is submitted
    this.router.navigate(['./address/'+this.address]);
    console.log(this.address)
 }

}
