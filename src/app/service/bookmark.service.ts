import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable, Subject } from "rxjs/Rx"

@Injectable()
export class BookmarkService {

  // public bookmarks: Array<any>;
  // public bookmarks:Subject<Array<any>> = new Subject<Array<any>>();

  private bookmarks: Subject<any>;

  constructor(private localStorageService: LocalStorageService) {

    this.bookmarks = new Subject();

    let b = this.localStorageService.get("bookmarks") as Array<any>
    this.bookmarks.next(b);
  }

  getBookmarks()
  {
    console.log("getBookmarks")
    return this.localStorageService.get("bookmarks")
  }

  eventBookmarks()
  {
    console.log("eventBookmarks")
    return  this.bookmarks.asObservable();
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
      this.bookmarks.next(book);
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
      this.bookmarks.next(book);
    }

  }

  isBookmarkSaved(trx)
  {
    let book = <Array<any>> this.localStorageService.get("bookmarks");
    if(book == null)
    {
      return false
    }
    else {
      let index = book.indexOf(trx)
      return (index == -1)? false : true ;
    }

  }

}
