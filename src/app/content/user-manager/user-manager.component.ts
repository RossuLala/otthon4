import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { User } from '../../model/User';
import { UserService } from '../../user.service';
import { UrlService } from '../../url.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit, OnDestroy {
  @Output() newUser: EventEmitter<any> = new EventEmitter();
  @Output() isEdit: boolean = false;
  @Output() lastUser: User = null;

  constructor(
    private userService: UserService,
    private urlService: UrlService     //az Url szervízt is használjuk
  ) { }

  ngOnInit() {   //amikor jön adat, akkor mi történjen
    this.lastUser = this.userService.getlastEditedUser();
    if (this.lastUser !== null) {
      this.userService.lastEditedUser = null;
      this.isEdit = true;
    } else {
      this.isEdit = false
    }
  }

  

  ngOnDestroy() {
    //this.urlService.urlChanged.unsubscribe(); // le kell iratkozni, hogy csak egyszer fusson le
  }
}
