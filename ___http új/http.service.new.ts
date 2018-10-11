import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConfigService } from './config.service';
import { read } from 'fs';
import { User } from './model/User';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    serverUrl: string;
    users: Array<User> = [];

    constructor(
        private http: Http,
        private config: ConfigService) { 

        this.serverUrl = this.config.get('usersApi') + "/";
    }

    create(database: string, data: any) {
        return new Promise((resolve, reject) => {
            try {
                data = JSON.stringify(data)
            } catch (err) {
                reject("Hibás objeltum")
            }
            let serverRequest = `${this.serverUrl}${database}`
            this.http.put(serverRequest, data)
                .forEach(
                    (response: Response) => {
                        resolve(response);
                    }
                )
        });
    }


    read(database: string, id: any) {
        return new Promise((resolve, reject) => {
            let serverRequest = `${this.serverUrl}${database}/${id}`
            this.http.get(serverRequest )
                .subscribe((response: Response) => {
                    let user: User = new User();
                    user.formObject(response.json());
                    resolve(user);
                    },
                    (err) => {
                        reject(err);
                    });
        });
    }


    readAll(database: string) {
        return new Promise((resolve, reject) => {
            let serverRequest = `${this.serverUrl}${database}/all`
            this.http.get(serverRequest)
                .subscribe((response: Response) => {
                    console.log('response-----------------', response);
                    console.log('response.json------------', response.json());
                    this.users = this.jsonToUser(response.json())
                    console.log('users---------------------', this.users);
                    resolve(this.users);
                    },
                    (err) => {
                        reject(err);
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


    update(database: string, user: User){
        return new Promise((resolve, reject) => {
            let serverRequest = `${this.serverUrl}${database}/${user.id}`
                this.http.post(serverRequest,JSON.stringify(user) )
                .forEach(
                    (response: Response) => {
                        resolve(response);
                    }
                )
        });
    }


    delete(database: string, user: User){
        return new Promise((resolve, reject) => {
            let serverRequest = `${this.serverUrl}${database}/${user.id}`
                this.http.delete(serverRequest )
                .forEach(
                    (response: Response) => {
                        resolve(response);
                    }
                )
        });
    }
    




}