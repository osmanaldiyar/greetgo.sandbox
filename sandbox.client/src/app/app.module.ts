import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {InputTextComponent} from './input-text/input-text.component';
import {HttpService} from "./http.service";
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "./login/login.service";
import {FormsModule} from "@angular/forms";
import {ClientListComponent} from './client-list/client-list.component';
import {ClientListService} from "./client-list/client-list.service";
import { AboutComponent } from './about/about.component';
import {TableComponent} from './table/table.component';
import { MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientListComponent,
    AboutComponent,
    InputTextComponent,
    TableComponent,
    EditDialogComponent,
    AddDialogComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, BrowserAnimationsModule, MatDialogModule
  ],
  entryComponents: [TableComponent, EditDialogComponent, AddDialogComponent],
  providers: [HttpService, LoginService, ClientListService],
  bootstrap: [AppComponent],

})
export class AppModule {}
