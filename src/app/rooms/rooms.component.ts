import { Component, OnInit } from '@angular/core';
import { Room } from '../model/Room';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
    rooms: Array<Room> = [];

    constructor() { }

    ngOnInit() {
    }

}
