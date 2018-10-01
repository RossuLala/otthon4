import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../user.service';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input('pageChange') PageChange: EventEmitter<any>;//any - Típus ellenőrzés kikapcsolása. Több dolog is átadható
  @Output() userCount: Number = 0;
  @Output() roomsCount: Number = 10;
  @Output() staffCount: Number = 30;
  @Output() currentStaffCount: Number = 10;


  
  private currentLink: string = "/";

  users = [];

  constructor(                                     // contructor adja, hogy melyik szervizeket tudjuk elérni
    private userService: UserService,
    private urlService: UrlService
    ) {}

  ngOnInit() {                           

    this.urlService.urlChanged.subscribe(        //figyelünk és feliratkozunk az eseményre
      (e) => {
        this.currentLink = e.url;
      }
    );

    this.currentLink = this.urlService.currentUrl;
    this.userCount = this.userService.getAll().length
  }

}
