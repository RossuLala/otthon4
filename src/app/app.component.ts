import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; //A browser értékeit tudjuk ezzel a komponessel beállítani
import {environment} from '../environments/environment'; //alapbeállítási értéket ebben tároljuk
import { ConfigService } from './config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Output() pageChange: EventEmitter<string> = new EventEmitter();


  public constructor(
    private cimke: Title,
    private config: ConfigService
    ){
  }


    ngOnInit(){
    this.cimke.setTitle(this.config.get('appTitle'));
  }

  onPageChange(pageUrl: string){
    //console.log('app.component---', pageUrl)
    this.pageChange.emit(pageUrl);
  }
}
