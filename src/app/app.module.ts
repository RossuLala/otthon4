import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ContentComponent } from './content/content.component';
import { UserManagerComponent } from './content/user-manager/user-manager.component';
import { UserService } from './user.service';
import { UserEditorComponent } from './content/user-manager/user-editor/user-editor.component';
import { UrlService } from './url.service';
import { NewUserComponent } from './content/user-manager/new-user/new-user.component';
import { UserTableRowComponent } from './content/user-table-row/user-table-row.component';
import { ConfigService } from './config.service';
import { HttpModule } from '@angular/http';
import { HttpService } from './http.service';

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
  ],
  imports: [  //ide kell rakni a más aáltal készített modulokat
    BrowserModule,
    FormsModule,
    HttpModule
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
