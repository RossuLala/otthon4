import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser'; //A browser értékeit tudjuk ezzel a komponessel beállítani
import {environment} from '../environments/environment'; //alapbeállítási értéket ebben tároljuk

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private cimke: Title){
    this.cimke.setTitle(environment.appTitle);
  }
}
