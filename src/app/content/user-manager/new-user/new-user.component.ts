import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/User';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor( private userService: UserService ) { }

  ngOnInit() {
  }

  submitForm(form) {
    console.log('submitForm:', form);
    if (!form.valid) {
      return false;
    }
    let values = form.value;
    let user = new User(1, values.lastName, values.firstName, values.email, values.phone, values.relatives, true);
    this.userService.pushOne(user);

  }

  checkError(form, control) {
    //console.log ('checkError:', form);

    if (!control) {
      return false;
    }

    if (control.pristine && !form.submitted) { //pristine - Még nem módosítottuk, submited - alkküldték az űrlapot
      return false;
    }

    if (!control.errors) {
      return false;
    }

    if (control.errors === null) {
      return false;
    }

    return true;

  }

}
