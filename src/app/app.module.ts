import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import {MomentModule} from 'angular2-moment';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';

import { EtherscanService } from './service/etherscan.service';
import { EtherwebsocketService } from './service/etherwebsocket.service';
import { TickerwebsocketService } from './service/tickerwebsocket.service';
import { BookmarkService } from './service/bookmark.service';

import { TransactionComponent } from './transaction/transaction.component';
import { HomeComponent } from './home/home.component';
import { BookmarkComponent } from './bookmark/bookmark.component';

const appRoutes: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'address/:id',      component: TransactionComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    HomeComponent,
    BookmarkComponent
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
  providers: [EtherscanService,EtherwebsocketService, TickerwebsocketService, BookmarkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
