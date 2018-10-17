import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Room } from '../model/Room';
import { HttpRoomService } from '../http-room.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {

    @Output() rooms: Array<Room> = [];// láthatóvá tesszük a szobákat
    @Output() keys: Array<{ key: string, label: string }> = [
        { key: "id", label: "#" },
        { key: "name", label: "név" },
        { key: "size", label: "méret" },
        { key: "slot", label: "férőhely" },
        { key: "floor", label: "emelet" },
        { key: "active", label: "aktív" }
    ]

    @Output() newRoom: Room = new Room(33, "új",40,1,1);
    private subjectSubscribe = null; // létrehozok egy változóz a subjektek tárolására

    constructor(
        private service: HttpRoomService
    ) { }

    ngOnInit() {
        //2. felitratkozunk a Subjektre
        this.service.getAll();
        this.subjectSubscribe = this.service.roomSubject
            .subscribe(
                (rooms) => {
                    this.rooms = rooms;
                }
            )
    }

    ngOnDestroy(): void {
        this.subjectSubscribe.unsubscribe();//leiratkozunk, hogy ne teljen meg a mória
    }

    createR() {
        this.service.createRoom(this.newRoom)
            .then(
                (res: Response) => {
                    this.service.getAll();
                    this.newRoom = new Room();
                }
            )
    }


    updateR(room: Room){
        this.service.updateRoom(room)
        .then(
            (res: Response) => {
                this.service.getAll();
            }
        )
    }


    deleteR(room: Room){
        this.service.deleteRoom(room)
        .then(
            (res: Response) => {
                this.service.getAll();
            }
        )
    }
}
