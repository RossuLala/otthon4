import { Component, OnInit } from '@angular/core';
import {Room} from '../model/Room';
import { HttpRoomService } from '../http-room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Array<Room> = [];
  constructor(
    private service: HttpRoomService 
  ) { }

  ngOnInit() {
    this.service.getAll();
  }

}
