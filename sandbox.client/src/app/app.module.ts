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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

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
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    Ng2SearchPipeModule, //including into imports,
    Ng2OrderModule, //add here
    NgxPaginationModule//add here
  ],
  entryComponents: [TableComponent, EditDialogComponent, AddDialogComponent],
  providers: [HttpService, LoginService, ClientListService],
  bootstrap: [AppComponent],

})
export class AppModule {}
