import { Injectable, Output, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { User } from './model/User';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

@Injectable()
export class UserService {
    users: Array<User> = [];
    lastEditedUser: User = null;
    usersGetted: boolean = false; //lekértük már a usereket?
    userOserver: Subject<any> = new Subject();             // létrehozunk egy Subjektet amit figyelni tudunk
    userUrl: string;

    constructor(
        private config: ConfigService,
        private http: Http,
        private httpService: HttpService) {

        this.userUrl = this.config.get('usersApi') + "/user";      //innen kell letölteni az adatokat
        this.getUserWidthObserver();
    }

    //Crud - CREATE
    pushOne(user: User) {
        return new Promise((resolve, reject) => {
            this.httpService.create("user", user)
                .then((res) => {
                    this.getUserWidthObserver();
                    resolve('Új adatfeltöltés rendben!!!');
                });
        });
    }


    //cRud - READ - egy felhasználó  
    getOne(id: Number) {
        return new Promise((resolve, reject) => {
            this.httpService.read("user", id)
                .then((user: User) => {
                    this.getUserWidthObserver();
                    resolve(user);
                });
        });
    }


    //crUd - UPDATE
    editUser(user: User) {
        console.log('user', user);
        return new Promise((resolve, reject) => {
            this.httpService.update("user", user)
                .then((response: Response) => {
                    this.getUserWidthObserver();
                    resolve(user);
                });
        });
    }


    //cruD - DELETE
    deleteUser(user: User) {
        return new Promise((resolve, reject) => {
            this.httpService.delete("user", user)
                .then((res) => {
                    this.getUserWidthObserver();
                    resolve('A törlés rendben!!!');
                });
        });
    }


    //cRud - READ - összes
    UgetUserWidthObserver() {
        this.httpService.readAll("user")
            .then((users) => {  
                    console.log('users------------------', users);               
                    this.userOserver.next(users);         
                },
                (error) => {                            
                    this.userOserver.error("Hiba az observerben");
                }
            );
    }

    //cRud - READ - összes
    getUserWidthObserver() {
        this.http.get(this.userUrl + "/all").subscribe(  //Felitatkozunk az eseményre
            (response: Response) => {                     //Az eredményt itt kapom meg
                //console.log('user.sevice - Response', response.json());         
                this.users = this.jsonToUser(response.json())
                this.userOserver.next(this.users);              //meghívjuk a subsscribe végrehajtását
            },
            (error) => {                            //Hibát itt kapom meg
                this.userOserver.error("Hiba az observerben");//hiba esetén ezt adom vissza
            }
        );
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


    changeStatus(user: User) {
        let index = this.getUserIndex(user.id);
        if (index !== null) {
            this.users[index].active = !this.users[index].active //legyen az ellenkezője
            this.userOserver.next(this.users);              //meghívjuk a subsscribe végrehajtását
        }
    }

    getUserIndex(id: Number) {    // kikeresi, hogy a tömb hányadik eleme az adott id
        let index = null;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id) {
                index = i;
            }
            this.userOserver.next(this.users);              //meghívjuk a subsscribe végrehajtását
        }
        return index;
    }

}