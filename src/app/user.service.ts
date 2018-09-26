import { Injectable } from '@angular/core';
import { User } from './model/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: Array<User> = [];
    lastEditedUser: User = null;

    constructor() {
        let user1 = new User(1, 'aaa1', 'bbb1', 'ccc1', 'ddd1', 'eee1', true)
        let user2 = new User(2, 'aaa2', 'bbb2', 'ccc2', 'ddd2', 'eee2', false)
        let user3 = new User(3, 'Rossu', 'László', 'lala@intralog.hu', '30-99-67-670', 'Wintou', true)
        this.users.push(user1);
        this.users.push(user2);
        this.users.push(user3);
    }

    getAll() {                 // visszaadjan az összes usert
        return this.users;
    }

    getOne(id: Number){                 //visszadja az adot id-jű usert
        let index = this.getUserIndex(id)
        if (index == null){
            return index;
        }
        return this.users[index];
    }

    getTopID(){
        let topID = 0;

        for (let user of this.users){
            if (user.id > topID ){
                topID = user.id
            }
        }
        return topID;
    }

    pushOne(user: User){
        user.id = this.getTopID() + 1;
        this.users.push(user);
        //console.log(this.users);
    }

    changeStatus(user: User){
        let index = this.getUserIndex(user.id);
        if (index!== null){
            this.users[index].active = !this.users[index].active //legyen az ellenkezője
        }
    }

    getUserIndex(id: Number){    // kikeresi, hogy a tömb hányadik eleme az adott id
        let index = null;
        for (let i=0; i<this.users.length; i++){
            if (this.users[i].id == id){
                index = i;
            }
        }
        return index;
    }

    editUser(user: User){                       //megkapjuk a módosított user értékeket
        let index = this.getUserIndex(user.id); //megkeressük a tömbben a sort ID alapján
        if (index!== null){
            for (let k in user){                //vég megyünk a user minden elemén
                this.users[index][k] = user [k] //beírjuk az új értékeket
            }
        }
    }
}
