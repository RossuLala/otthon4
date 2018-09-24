import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  submitForm(values){
    console.log ('submitForm:',values);
  }

  checkError(form, control){
    console.log ('checkError:', form);

    if (!control){
      return false;
    }

    if (control.pristine && !form.submitted){ //pristine - Még nem módosítottuk, submited - alkküldték az űrlapot
      return false;
    }

    if (!control.errors){
      return false;
    }

    if (control.errors === null){
      return false;
    }

    return true;

  }
}
