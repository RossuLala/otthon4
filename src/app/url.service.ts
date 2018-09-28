import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  @Output() urlChanged: EventEmitter<{ url: string, data: Object }> = new EventEmitter(); //eseménykezelő indítása megadjuk, hogy mit adunk át

  currentUrl: string = "/";

  constructor() { }

  jumpTo(url: string, data: Object = {} ) {
    this.currentUrl = url;
    this.urlChanged.emit({ url: this.currentUrl, data});   //átadjuk az adatokat az eseménykezelőnek
  }

}
