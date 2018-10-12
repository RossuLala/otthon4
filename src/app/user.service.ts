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
    userObserver: Subject<any> = new Subject();             // létrehozunk egy Subjektet amit figyelni tudunk
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

    //cRud - READ - összes
    getUserWidthObserver() {
        this.http.get(this.userUrl + "/all").subscribe(  //Felitatkozunk az eseményre
            (response: Response) => {                     //Az eredményt itt kapom meg
                //console.log('user.sevice - Response', response.json());         
                this.users = this.jsonToUser(response.json())
                this.userObserver.next(this.users);              //meghívjuk a subsscribe végrehajtását
            },
            (error) => {                            //Hibát itt kapom meg
                this.userObserver.error("Hiba az observerben");//hiba esetén ezt adom vissza
            }
        );
    }

    //cRud - READ - egy felhasználó  
    getOne(id: Number) {
        return new Promise((resolve, reject) => {
            this.httpService.read("user", id)
                .then((user: User) => {
                     resolve(user);
                });
        });
    }


    getOne_r(id: Number) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.userUrl}/${id}`)
                .subscribe(
                    (response: Response) => {
                        let user: User = new User();
                        user.formObject(response.json());
                        resolve(user);
                    },
                    (err) => {
                        reject(err);
                    });
        });
    }


    //crUd - UPDATE
    editUser(user: User) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.userUrl}/${user.id}`, JSON.stringify(user))
                .subscribe(
                    (response: Response) => {
                        this.getUserWidthObserver();         // szól hogy frissültek az adatok
                        resolve('Adatfeltöltés rendben!!!');//üzenet a submitForm-nak a sikeres feltöltésről
                    },
                    (err) => {
                        reject(err);
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
            this.userObserver.next(this.users);              //meghívjuk a subsscribe végrehajtását
        }
    }

    getUserIndex(id: Number) {    // kikeresi, hogy a tömb hányadik eleme az adott id
        let index = null;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id) {
                index = i;
            }
            this.userObserver.next(this.users);              //meghívjuk a subsscribe végrehajtását
        }
        return index;
    }

}