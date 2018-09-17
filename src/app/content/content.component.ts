import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  user:{   // TÍPUS DEKLARÁCIÓ - létrehozok egy usert és TypeScrip-ben megadhatom az adatok típusát
    id:number, 
    lastName?:string,
    firstName?:string,
    email?:string,
    phone?:string,
    relatives?:string  //?- nem kötelező kitölteni
   }

   users = [];

  constructor() {
    let user = {
      id: 1,
      lastName:"Kiss",
      firstName:"Éva",
      email:"lala@intralog.hu",
      phone: "30-99-67-670",
      relatives: "WINETOU"
    }

    let user2 = {
      id: 1,
      lastName:"Kiss",
      firstName:"Éva",
      email:"lala@intralog.hu",
      phone: "30-99-67-670",
      relatives: "WINETOU"
    }

    this.users.push (user);
    this.users.push (user2);
   }

  ngOnInit() {
  }

}
