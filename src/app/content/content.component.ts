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
    //let user1 = this.userService.getOne(1);
    console.log('this.userService.getOne(2)', this.userService.getOne(2));
  }

  onChangeActive(user: User){
    this.userService.changeStatus(user);
    console.log('this.users', this.users);
  }

  onEditUser(user: User){
    this.userService.lastEditedUser = user;
    console.log('this.userService.lastEditedUser', this.userService.lastEditedUser);
    
}
