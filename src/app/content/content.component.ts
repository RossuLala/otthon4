import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input('pageChange') PageChange: EventEmitter<any>;//any - Típus ellenőrzés kikapcsolása. Több dolog is átadható
  private currentLink: string = "/";

  users = [];

  constructor(private userService: UserService) { // contructor adja, hogy a UserService szervízt userService néven fogjuk elérni
    console.log('construkted');
  }

  ngOnInit() {

    this.PageChange.subscribe(
      (url) => {
        //console.log('content.component---', url);
        this.currentLink = url;

      }
    );

    this.users = this.userService.getAll();

    let user1 = this.userService.getOne(2);

  }

  getActiveUsers() {
    let actives = [];
    for (let user of this.users) {//TS szekezet: Nem a kulcsokon, hanem az értékekemn megy végig i egy user
      if (user.active){
        actives.push(user);
      }
    }
    return actives
  }

  onNewUser(user: User){ //A modelben megadott szekezetre hivatkozok
    let lastID = this.users[this.users.length-1].id
    user.id = lastID + 1;
    this.users.push(user);
  }

}
