import {Component, OnInit} from '@angular/core';
import {Client} from '../models/client';

import {MatDialog} from '@angular/material';
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {AddDialogComponent} from "../add-dialog/add-dialog.component";
import {ClientsPageService} from "./clients-page.service";
import {HttpService} from "../http.service";


export interface DialogData {
  fio: string;
  character: string;
  age: number;
  total_cash_rem: number;
  max_rem: number;
  min_rem: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  private page:number = 0;
  public pages: Array<number>;
  public clients: Client[];



  constructor(public dialog: MatDialog, private clientsPageService: ClientsPageService, private http: HttpService) {
  }

  //sorting
  key: string = 'age'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //initializing p to one
  p: number = 1;

  ngOnInit() {
    this.getClients()
  }

  getClients(){
    this.http.get(this.clientsPageService.getClients(this.page)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clients'];
      this.pages = new Array(resp.body['totalPages']);
    });

  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.getClients()
  }

  openDialog(client: Client): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '550px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  openAddDialog(client: Client): void {
    const addDialogRef = this.dialog.open(AddDialogComponent, {
      width: '550px',
      data: {
        client: {
          fio: "Lermontov",
          character: "Char",
          age: 90,
          total_cash_rem: 5000,
          max_rem: 5000,
          min_rem: 1000
        }
      }
    });

    addDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  delete(selectedItem: any) {
    console.log("Selected item Id: ", selectedItem.param1);

    this.http.delete("/list", {
      client: selectedItem
    }, "text").toPromise().then(resp => resp.body as string);

    this.clients.splice(selectedItem.param1, 1);
  }


}




