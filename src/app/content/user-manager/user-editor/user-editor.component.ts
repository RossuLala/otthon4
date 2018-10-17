import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../../../model/User';
import { UserService } from '../../../user.service';

@Component({
    selector: 'app-user-editor',
    templateUrl: './user-editor.component.html',
    styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {
    @Input() 
    user: User;
    editedUser: User = new User; //

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getOne(this.user.id)
            .then((user: User) => {
                this.editedUser = user;
            })
    }

    submitForm() {
        //console.log('submitForm-user:', this.editedUser);
        this.userService.editUser(this.editedUser)
            .then(
                (message:string) => {
                    console.info(message);// üzenet az editUser-től
                }
        );
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
