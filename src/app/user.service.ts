import { Injectable, Output } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from './model/User';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: Array<User> = [];
    lastEditedUser: User = null;
    usersGetted: boolean = false; //lekértük már a usereket?

    constructor( private config: ConfigService, private http: Http ) {
        this.getUsersFromHttp()
    }

    getUsersFromHttp() {
        return new Promise ((resolve, reject) =>{            //Vár amíg vége nem hajtódik (rendbe, hibás)
            if (this.usersGetted){                          //ha már lekértük a usereket
                return resolve(this.users)
            }
            this.http.get(this.config.get('usersApi'))      //A configból kérem le a HTTP helyét (request is jó a get helyett)
            .subscribe(                                    //Felitatkozunk az eseményre
                (response: Response) => {                 //Az eredményt itt kapom meg
                    this.usersGetted = true;             //a lekértük-e már a usereket igenre állítjuk
                    //console.log('A verzió: ', response.json());
                    //console.log('B verzió: ', JSON.parse(response._body);
                    this.users = this.jsonToUser(response.json())
                    resolve(this.users); //rendben esetén ezt adom vissza
                },
                (error) => {                            //Hibát itt kapom meg
                    reject(error);//hiba esetén ezt adom vissza
                }
            )
        });
    }

    jsonToUser(userArray): User[] {             //végig megy a json-ból beolvasott tömbön és beolvassa a userekbe
        let users: Array<User> = [];
        for (let user of userArray) {
            let newUser = new User();
            newUser.formObject(user);
            users.push(newUser);
        }
        return users;
    }

    getAll(): Promise<any> { // Promise vár userek visszadására
        return this.getUsersFromHttp();
    }

    getOne(id: Number) {
        //visszadja az adot id-jű usert
        let index = this.getUserIndex(id)
        if (index == null) {
            return index;
        }
        return this.users[index];
    }

    getTopID() {
        let topID = 0;

        for (let user of this.users) {
            if (user.id > topID) {
                topID = user.id
            }
        }
        return topID;
    }

    getlastEditedUser() {
        return this.lastEditedUser
    }

    pushOne(user: User) {
        user.id = this.getTopID() + 1;
        this.users.push(user);
        //console.log(this.users);
    }

    changeStatus(user: User) {
        let index = this.getUserIndex(user.id);
        if (index !== null) {
            this.users[index].active = !this.users[index].active //legyen az ellenkezője
        }
    }

    getUserIndex(id: Number) {    // kikeresi, hogy a tömb hányadik eleme az adott id
        let index = null;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id) {
                index = i;
            }
        }
        return index;
    }

    editUser(user: User) {                       //megkapjuk a módosított user értékeket
        let index = this.getUserIndex(user.id); //megkeressük a tömbben a sort ID alapján
        if (index !== null) {
            for (let k in user) {                //vég megyünk a user minden elemén
                this.users[index][k] = user[k] //beírjuk az új értékeket
            }
        }
    }

    deleteUser(user: User) {
        let index = this.getUserIndex(user.id);
        this.users.splice(index, 1); //a tömb valahanyadik elemétől töröl valahány elemet
    }
}
