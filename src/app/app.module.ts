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


@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    LeftSidebarComponent,
    ContentComponent,
    UserManagerComponent,
    UserEditorComponent,
    NewUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ // provire - elérhetővé tesszük minenhonnan (beteszi az importok közé)
    UserService, 
    UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
