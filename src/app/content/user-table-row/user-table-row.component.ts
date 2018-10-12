import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../model/User';
import { UserService } from '../../user.service';
import { UrlService } from '../../url.service';

@Component({
    selector: 'app-user-table-row',
    templateUrl: './user-table-row.component.html',
    styleUrls: ['./user-table-row.component.css']
})
export class UserTableRowComponent implements OnInit, OnDestroy {
    users: User[] = [];
    userSubscribe = null;  //letárolom, hogy miról kell leiratkozni a ngOnDestroy()-al

    constructor(
        private userService: UserService,
        private urlService: UrlService) { }

    ngOnInit() {
        this.users = this.userService.users;
        this.userSubscribe = this.userService.userObserver.subscribe( //letárolom, hogy miről kell leiratkozni
            (users) => {
                this.users = users;
            },
            (err) => {
                this.users = [];
            }
        )
    }

    ngOnDestroy(): void {
        this.userSubscribe.unsubscribe()   //leiratkozok az esemnyről, hogy ne menjen lete e memória
    }

    onChangeActive(user: User) {
        this.userService.changeStatus(user);
        //console.log('this.users', this.users);
    }

    onEditUser(user: User) {
        this.userService.lastEditedUser = user;
        this.urlService.jumpTo('/user-manager', user)// átadjuk, hogy hová lépjen és az usert-is
    }

    deleteUser(user: User) {
        this.userService.deleteUser(user)
        .then(
            (message: string) => {
                console.log(message)
            }

        )
    }
}
