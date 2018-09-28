import { Component, OnInit, Input, EventEmitter } from '@angular/core';
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

    //this.currentLink = this.urlService.currentUrl; // nem biztos, hogy törölni kell!!!
    this.users = this.userService.getAll();
  }

  onChangeActive(user: User){
    this.userService.changeStatus(user);
    //console.log('this.users', this.users);
  }

  onEditUser(user: User){
    this.userService.lastEditedUser = user;
    this.urlService.jumpTo('/user-manager',user )// átadjuk, hogy hová lépjen és az usert-is
  }

  deleteUser( user: User ){
    this.userService.deleteUser(user);
  }
}
