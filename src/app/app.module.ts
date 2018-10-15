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

const routerSettings: Routes = [
    //A rooter irányit a megfelelő oldalakra
    { path: '', component: ContentComponent },
    { path: 'user-manager', component: UserManagerComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'supply', component: SupplyComponent },
    { path: '**', component: PageNotFoundComponent },//** nem létező oldal esetén ide lépjen
];


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
        SupplyComponent 
    ],
    imports: [  //ide kell rakni a más aáltal készített modulokat
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routerSettings)
    ],
    providers: [ //saját modulokat ide tesszük
        UserService,
        UrlService,
        ConfigService,
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
