import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  private currentLink:string = "/";

  constructor() { }

  ngOnInit() {
  }

  onMenuClick($event:Event){
    $event.preventDefault();  //megakadályozza, hogy frissüljön az oldal
    let element = $event.target as HTMLLinkElement;
    this.currentLink = element.href.replace(location.origin,""); //CONSOLE-> location. beírásakor lászanak a választási lehetőségel
    console.log(this.currentLink);
  }

}
