import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";
import { BookmarkService } from '../service/bookmark.service';
// import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent  { //implements OnInit

  public bookmarks:any;

  constructor(private bookmarkService: BookmarkService)
  {
    console.log("BookmarkComponent")

    //get current bookmarks
    this.bookmarks = this.bookmarkService.getBookmarks()

    //event biding changes
    this.bookmarkService.eventBookmarks().subscribe((newData) => {
        this.bookmarks = newData
    });

  }

  // ngOnInit() {
  // }
  removeBookmark(trx)
  {
    console.log("remove Bookmark")
    this.bookmarkService.removeBookmark(trx)
  }

  setBookmark(trx)
  {
    console.log("set Bookmark")
    this.bookmarkService.setBookmark(trx)
  }


}
