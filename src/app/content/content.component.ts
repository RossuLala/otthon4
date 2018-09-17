import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {


   users = [];

  constructor() {

  }

  ngOnInit() {
    let user1 = new User (1,'aaa', 'bbb','ccc','ddd')
    let user2 = new User (1,'aaa', 'bbb','ccc','ddd')
    let user3 = new User (1,'aaa', 'bbb','ccc','ddd')
    this.users.push (user1);
    this.users.push (user2);
    this.users.push (user3);
  }

}
