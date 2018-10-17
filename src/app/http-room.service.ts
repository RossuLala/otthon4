import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http, Response } from '@angular/http';
import { ConfigService } from './config.service';
import { Room } from './model/Room';
import { Subject } from 'rxjs';

@Injectable()
export class HttpRoomService extends HttpService {// Örökítjük a HttpService-ből
    private baseUrl: string;
    public rooms: Array<Room> = []; //A szobák tombjét elérhetővé teszem

    constructor(
        http: Http,
        config: ConfigService) {
        //A supet függvény importálja ezeket az osztályokat a supet függvénnyel. 
        super(http, config);
        this.baseUrl = this.config.get('usersApi');
        this.getAll();
    }
    //1.Létrehozok egy Subjectet, amit figyelni tudunk:
    public roomSubject: Subject<any> = new Subject();

    getAll() {
        this.read(`${this.baseUrl}/room/all`)
        .then(
            (response: Response) => {
                this.rooms = response.json();
                this.roomSubject.next(this.rooms);     
            }
        );
    }

    createRoom(room:Room){
        return this.create(`${this.baseUrl}/room`, room);
    }

    updateRoom(room:Room){
        
        return this.update(`${this.baseUrl}/room/${room.id}`, room);
    }

    deleteRoom(room:Room){
        return this.delete(`${this.baseUrl}/room/${room.id}`);
    }
}
