import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { EtherscanService } from './service/etherscan.service';
import { EtherwebsocketService } from './service/etherwebsocket.service';
import { TickerwebsocketService } from './service/tickerwebsocket.service';

import {MomentModule} from 'angular2-moment';
import { TransactionComponent } from './transaction/transaction.component';
import { HomeComponent } from './home/home.component';

import { LocalStorageModule } from 'angular-2-local-storage';

const appRoutes: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'address/:id',      component: TransactionComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    MomentModule,
    RouterModule.forRoot(appRoutes),
    LocalStorageModule.withConfig({
           prefix: 'starbase',
           storageType: 'localStorage'
       }),
    HttpModule
  ],
  providers: [EtherscanService,EtherwebsocketService, TickerwebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
