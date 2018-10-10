import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConfigService } from './config.service';
import { read } from 'fs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private http: Http,
        private config: ConfigService) { }

    create(url: string, data: any) {
        return new Promise((resolve, reject) => {
            try {
                data = JSON.stringify(data)
            } catch (err) {
                reject("Hibás objeltum")
            }
            this.http.put(url, data)
                .forEach(
                    (response: Response) => {
                        resolve(response);
                    }
                )
        });


    }

    read() {
    }

    update(){

    }

    delete(){
        
    }
}
