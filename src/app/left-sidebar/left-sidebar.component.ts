import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  private currentLink:string = "/";
  @Output('change') pageChange: EventEmitter<string> = new EventEmitter();  //@Output dekorator 'change' néven teszi elérhetővé


  constructor() { }

  ngOnInit() {
  }

  onMenuClick($event:Event){
    $event.preventDefault();  //megakadályozza, hogy frissüljön az oldal
    let element = $event.target as HTMLLinkElement;
    this.currentLink = element.href.replace(location.origin,""); //CONSOLE-> location. beírásakor lászanak a választási lehetőségel

    this.pageChange.emit(this.currentLink); //emit az esemény kiváltásáért felel

    console.log('left-sidebar.component---',this.currentLink);
  }

}
