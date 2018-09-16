import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment'; //IMPORT - használni szeretném a {} ban megatott komponest amit itt találok FROM


@Component({ //komponens leírása
  selector: 'app-top-header', //Így tudom HTML-ben meghívni ezt a componest:{{SELECTOR}}
  templateUrl: './top-header.component.html', //itt találom a komponens HTLM fálját
  styleUrls: ['./top-header.component.css'] //A stílusa itt található
})
export class TopHeaderComponent implements OnInit { // EXPORTÁLOK egy CLASS-t és egy IMPLEMENT-et
  appTitle:string = "";

  constructor() { //CONSTRUKTOR-ban adom meg, hogy mit mi csináljon a komponens
    //console.log(environment.appTitle)
    this.appTitle = environment.appTitle;
  }

  ngOnInit() {
  }

}
