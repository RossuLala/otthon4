import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ContentComponent } from './content/content.component';
import { UserManagerComponent } from './content/user-manager/user-manager.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    LeftSidebarComponent,
    ContentComponent,
    UserManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [UserService],// provire - elérhetővé tesszük minenhonnan (beteszi az importok közé)
  bootstrap: [AppComponent]
})
export class AppModule { }
