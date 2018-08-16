import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { AppRouter} from './app.route';
import {  HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { MemberComponent } from './groups/member/member.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    HeaderComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
