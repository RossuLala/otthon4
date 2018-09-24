import { Component, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser'; //A browser értékeit tudjuk ezzel a komponessel beállítani
import {environment} from '../environments/environment'; //alapbeállítási értéket ebben tároljuk


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() pageChange: EventEmitter<string> = new EventEmitter();


  public constructor(private cimke: Title){
      this.cimke.setTitle(environment.appTitle);
  }

  onPageChange(pageUrl: string){
    //console.log('app.component---', pageUrl)
    this.pageChange.emit(pageUrl);
  }
}
