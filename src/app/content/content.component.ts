import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input('pageChange') PageChange: EventEmitter<any>;//any - Típus ellenőrzés kikapcsolása. Több dolog is átadható
  private currentLink: string = "/";

  users = [];

  constructor() { }

  ngOnInit() {
    let user1 = new User(1, 'aaa1', 'bbb1', 'ccc1', 'ddd1', 'eee1', true)
    let user2 = new User(2, 'aaa2', 'bbb2', 'ccc2', 'ddd2', 'eee2', false)
    let user3 = new User(3, 'Rossu', 'László', 'lala@intralog.hu', '30-99-67-670', 'Wintou', true)
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);

    this.PageChange.subscribe(
      (url) => {
        //console.log('content.component---', url);
        this.currentLink = url;

      }
    )
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
