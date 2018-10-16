import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http, Response } from '@angular/http';
import { ConfigService } from './config.service';

@Injectable()
export class HttpRoomService extends HttpService {// Örökítjük a HttpService-ből
    private baseUrl: string;

    constructor(
        http: Http,
        config: ConfigService) {
        //A supet függvény importálja ezeket az osztályokat a supet függvénnyel. 
        super(http, config);
        this.baseUrl = this.config.get('usersApi');
    }

    getAll() {
        this.read(`${this.baseUrl}/room/all`)
        .then(
            (response: Response) => {
            console.log('response', response.json());
     
            }
        );
    }
}
