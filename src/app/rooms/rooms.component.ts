import { Component, OnInit, Output } from '@angular/core';
import { Room } from '../model/Room';
import { HttpRoomService } from '../http-room.service';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
    rooms: Array<Room> = [];
    @Output() keys: Array<{ key: string, label: string }> = [
        { key: "id", label: "#" },
        { key: "name", label: "név" },
        { key: "size", label: "méret" },
        { key: "slot", label: "férőhely" },
        { key: "floor", label: "emelet" },
        { key: "active", label: "aktív" }
    ]

    @Output() newRoom: Room = new Room(33, "kék szoba");

    constructor(
        private service: HttpRoomService
    ) { }

    ngOnInit() {
        this.service.getAll();
    }

    createRoom() {
        this.service.createRoom(this.newRoom)
        .then(
            (res:Response) => {
                console.log(res)
            }
        )
    }
}
