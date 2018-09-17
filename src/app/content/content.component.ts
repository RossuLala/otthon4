import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  users = [];

  constructor() {}

  ngOnInit() {

    let user1 = new User (1,'aaa1', 'bbb1','ccc1','ddd1')
    let user2 = new User (2,'aaa2', 'bbb2','ccc2','ddd2')
    let user3 = new User (1,'Rossu', 'László','lala@intralog.hu','30-99-67-670')
    this.users.push (user1);
    this.users.push (user2);
    this.users.push (user3);
  }
}
