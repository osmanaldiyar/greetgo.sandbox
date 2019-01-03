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

  private page:number = 1;
  public sortAttribute:string;
  public orderBy:string;
  public searchSurname: string ="";
  public searchName: string = "";
  public searchPatronymic: string = "";


  public pages: Array<number>;
  public clients: Client[];


  isDisabled: boolean = true;

  constructor(public dialog: MatDialog, private clientsPageService: ClientsPageService, private http: HttpService) {

  }



  //sorting
  key: string = 'age'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;

    console.log("reverse: "+this.reverse);

    if(this.reverse){
      this.orderBy = "asc";
      console.log("orderBy: "+this.orderBy);
    }else if(this.reverse == false){
      this.orderBy = "desc";
      console.log("orderBy: "+this.orderBy);
    }

    if(key == "fullname"){

      this.sortAttribute = "fullname";
      console.log("attr: "+this.sortAttribute);

    }else if(key == "age"){

      this.sortAttribute = "age";
      console.log("attr: "+this.sortAttribute);

    }else if(key == "total_cash_remainings"){

      this.sortAttribute = "total_cash_remainings";
      console.log("attr: "+this.sortAttribute);

    }else if(key == "max_cash_remainings"){
      this.sortAttribute = "max_cash_remainings";
      console.log("attr: "+this.sortAttribute);

    }else if(key == "min_cash_remainings"){

      this.sortAttribute = "min_cash_remainings";
      console.log("attr: "+this.sortAttribute);

    }

    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clients'];
      this.pages = new Array(resp.body['totalPages']);

    });

  }

  //initializing p to one
  p: number = 1;



  ngOnInit() {
    this.getClients()
  }

  getClients(){
    console.log("attr: "+this.sortAttribute + "orderBy: "+this.orderBy)
    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clients'];
      this.pages = new Array(resp.body['totalPages']);
    });
    this.setClickedRow = function(index){
      this.selectedRow = index;
      this.isDisabled = false
      console.log("selected row "+this.selectedRow)
    }



  }

  //
  selectedRow : number;
  setClickedRow : Function;



  setPage(i,event:any){
    event.preventDefault();

    this.page = i;

    this.getClients()
  }

  openDialog(): void {

    console.log()

    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '550px',
      data: this.clients[this.selectedRow]
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

  searchFilter(searchSurname:string, searchName:string, searchPatronymic: string){

    this.searchSurname = searchSurname;
    this.searchName = searchName;
    this.searchPatronymic = searchPatronymic;


    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clients'];
      this.pages = new Array(resp.body['totalPages']);
    });
  }


}




