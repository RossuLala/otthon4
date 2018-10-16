import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ContentComponent } from './content/content.component';
import { UserManagerComponent } from './content/user-manager/user-manager.component';
import { UserEditorComponent } from './content/user-manager/user-editor/user-editor.component';
import { NewUserComponent } from './content/user-manager/new-user/new-user.component';
import { UserTableRowComponent } from './content/user-table-row/user-table-row.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SupplyComponent } from './supply/supply.component';


import { UserService } from './user.service';
import { UrlService } from './url.service';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { HttpRoomService } from './http-room.service';


const routerSetting: Routes = [
    { path: '', component: ContentComponent },
    { path: 'user-manager', component: UserManagerComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'supply', component: SupplyComponent },
    { path: '**', component: PageNotFoundComponent },//hiba oldal 404hiba.
]

@NgModule({
    declarations: [
        AppComponent,
        TopHeaderComponent,
        LeftSidebarComponent,
        ContentComponent,
        UserManagerComponent,
        UserEditorComponent,
        NewUserComponent,
        UserTableRowComponent,
        PageNotFoundComponent,
        RoomsComponent,
        SupplyComponent,
    ],
    imports: [  
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routerSetting)
    ],
    providers: [ 
        UserService,
        UrlService,
        ConfigService,
        HttpService,
        HttpRoomService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
