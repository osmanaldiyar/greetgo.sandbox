import {Component, OnInit} from '@angular/core';
import {Client} from '../models/client';

import {MatDialog} from '@angular/material';
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {AddDialogComponent} from "../add-dialog/add-dialog.component";
import {ClientsPageService} from "./clients-page.service";
import {HttpService} from "../http.service";


export interface DialogData {
  id: number;
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
  public sortAttribute:string;
  public orderBy:string;
  public searchSurname: string ="";
  public searchName: string = "";
  public searchPatronymic: string = "";


  public pages: Array<number>;
  public clients: Array<Client>;
  public firstClientIndex: number;
  public lastClientIndex: number;

  public selectedClient: Client;
  public isFiltering: boolean = false;
  public shortcutPages: Array<number> = [];
  public selected: boolean = false;
  public totalElements: number;

  isDisabled: boolean = true;

  amountOfRowsToDisplay: number = 5;

  constructor(public dialog: MatDialog, private clientsPageService: ClientsPageService, private http: HttpService) {
    this.setClickedRow = function(index,client){
      console.log("client id",client.id);
      this.selectedClient = client;

      if(index == this.selectedRow){

        this.selected = false;

      }else{

        this.selectedRow = index;
        this.selected = true;

      }

      this.isDisabled = false


      if(this.selected == false){

        this.selectedRow = undefined;
        this.isDisabled = true;

      }
      //console.log("selected row "+this.selectedRow)
    }
  }

  //sorting
  key: string = 'age'; //set default
  reverse: boolean = false;
  sort(key){
    this.isFiltering = true;
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

    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic,this.amountOfRowsToDisplay)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clientsToDisplay'];
      this.pages = new Array(resp.body['totalPages']);
      this.firstClientIndex = resp.body['firstElement'];
      this.lastClientIndex = resp.body['lastElement'];
      this.totalElements = resp.body['totalElements'];
      this.isFiltering = true;
    });

  }

  //initializing p to one
  p: number = 1;



  ngOnInit() {
    this.getClients()
  }



  getClients(){
    console.log("attr: "+this.sortAttribute + "orderBy: "+this.orderBy)
    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic,this.amountOfRowsToDisplay)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clientsToDisplay'];
      this.pages = new Array(resp.body['totalPages']);
      this.firstClientIndex = resp.body['firstElement'];
      this.lastClientIndex = resp.body['lastElement'];
      this.totalElements = resp.body['totalElements'];

      for(var _i = 5; _i <= resp.body['totalElements']; _i+=5){
        console.log("shortcuts ", _i)
        if(this.shortcutPages.indexOf(_i) === -1){
          this.shortcutPages.push(_i);
        }
      }


    });




  }

  //

  selectedRow : number;
  setClickedRow : Function;



  setPage(p:number, event: any){
    event.preventDefault();

    this.page = p;

    this.getClients();
  }

  setRows(row:number, event: any){
    event.preventDefault();

    this.amountOfRowsToDisplay = row;

    this.getClients();
  }


  openDialog(): void {

    // console.log("selected row", this.selectedRow)
    // console.log("Editing client ", this.clients[this.selectedRow].FIO);

    console.log("----list element id" + this.selectedClient.id);
    var id = this.selectedClient.id;
    console.log("-id ha ",id)
    const dialogRef2 = this.dialog.open(EditDialogComponent, {
      width: '550px',
      data: {
        client: {
          id: id,
          fio: this.clients[this.selectedRow].FIO,
          character: this.clients[this.selectedRow].character,
          age: this.clients[this.selectedRow].age,
          total_cash_rem: this.clients[this.selectedRow].total_cash_remainings,
          max_rem: this.clients[this.selectedRow].max_remainings,
          min_rem: this.clients[this.selectedRow].min_remainings

        }
      }

    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)

      this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic,this.amountOfRowsToDisplay)).toPromise().then(resp => {
        console.log(resp)
        this.clients = resp.body['clientsToDisplay'];
        this.pages = new Array(resp.body['totalPages']);
        this.firstClientIndex = resp.body['firstElement'];
        this.lastClientIndex = resp.body['lastElement'];
        this.totalElements = resp.body['totalElements'];
      });

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
        },
        clientDetails:{
          id:0,
          gender:"Male",
          dateOfBirth:"",
          street:"",
          house:"",
          flatNumber:"",
          registeredStreet:"",
          registeredHouse:"",
          registeredFlatNumber:"",
          phoneNumber1:"",
          phoneNumber2:"",
          phoneNumber3:"",
          phoneNumber4:"",
          phoneNumber5:"",
        }
      }
    });

    addDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      this.http.get(this.clientsPageService.getClients((this.pages.length-1),this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic,this.amountOfRowsToDisplay)).toPromise().then(resp => {
        console.log(resp)
        this.clients = resp.body['clientsToDisplay'];
        this.pages = new Array(resp.body['totalPages']);
        this.firstClientIndex = resp.body['firstElement'];
        this.lastClientIndex = resp.body['lastElement'];
        this.totalElements = resp.body['totalElements'];
      });

    });


  }

  delete() {
    console.log("this.clients[this.selectedRow].id " + this.clients[this.selectedRow].id);

    this.http.delete("/list?id="+this.clients[this.selectedRow].id+"&rows="+this.amountOfRowsToDisplay, {
    }, "text").toPromise().then(resp => console.log(resp.body));

    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic,this.amountOfRowsToDisplay)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clientsToDisplay'];
      this.pages = new Array(resp.body['totalPages']);
      this.firstClientIndex = resp.body['firstElement'];
      this.lastClientIndex = resp.body['lastElement'];
      this.totalElements = resp.body['totalElements'];
    });

  }

  searchFilter(searchSurname:string, searchName:string, searchPatronymic: string){
    this.isFiltering = true;
    this.searchSurname = searchSurname;
    this.searchName = searchName;
    this.searchPatronymic = searchPatronymic;


    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic,this.amountOfRowsToDisplay)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clientsToDisplay'];
      this.pages = new Array(resp.body['totalPages']);
      this.firstClientIndex = resp.body['firstElement'];
      this.lastClientIndex = resp.body['lastElement'];
      this.totalElements = resp.body['totalElements'];
    });
  }


}




