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
  public sortAttribute:string;
  public orderBy:string;
  public searchSurname: string ="";
  public searchName: string = "";
  public searchPatronymic: string = "";


  public pages: Array<number>;
  public clients: Array<Client>;
  public firstClientIndex: number;
  public lastClientIndex: number;
  //unused
  public selectedClient: Client;
  public isFiltering: boolean = false;
  public shortcutPages: Array<number> = [];
  public selected: boolean = false;


//unused
  isDisabled: boolean = true;

  constructor(public dialog: MatDialog, private clientsPageService: ClientsPageService, private http: HttpService) {
    this.setClickedRow = function(index,client){
      console.log("client id",client.id);
      this.selectedClient = client;
      this.selectedRow = index;
      this.isDisabled = false

      this.isSelected();
      if(this.selected == false){
        this.selectedRow = undefined;
        this.isDisabled = true;
      }
      console.log("selected row "+this.selectedRow)
    }
  }

  isSelected(){
    this.selected = !this.selected;
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

    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clientsToDisplay'];
      this.pages = new Array(resp.body['totalPages']);
      this.firstClientIndex = resp.body['firstElement'];
      this.lastClientIndex = resp.body['lastElement'];
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
    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clientsToDisplay'];
      this.pages = new Array(resp.body['totalPages']);
      this.firstClientIndex = resp.body['firstElement'];
      this.lastClientIndex = resp.body['lastElement'];

      for(var _i = 0; _i < resp.body['totalPages']; _i+=4){
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

      this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic)).toPromise().then(resp => {
        console.log(resp)
        this.clients = resp.body['clientsToDisplay'];
        this.pages = new Array(resp.body['totalPages']);
        this.firstClientIndex = resp.body['firstElement'];
        this.lastClientIndex = resp.body['lastElement'];
      });

    });
  }

  delete() {

    console.log("Selected item Id: ", this.selectedRow);
    console.log("offset element id "+ this.selectedRow);

    var id = this.firstClientIndex+this.selectedRow;
    console.log("list element id" + id);

    this.http.delete("/list?id="+id, {
    }, "text").toPromise().then(resp => console.log(resp.body));

    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clientsToDisplay'];
      this.pages = new Array(resp.body['totalPages']);
      this.firstClientIndex = resp.body['firstElement'];
      this.lastClientIndex = resp.body['lastElement'];
    });

  }

  searchFilter(searchSurname:string, searchName:string, searchPatronymic: string){
    this.isFiltering = true;
    this.searchSurname = searchSurname;
    this.searchName = searchName;
    this.searchPatronymic = searchPatronymic;


    this.http.get(this.clientsPageService.getClients(this.page,this.sortAttribute,this.orderBy,this.searchSurname,this.searchName,this.searchPatronymic)).toPromise().then(resp => {
      console.log(resp)
      this.clients = resp.body['clientsToDisplay'];
      this.pages = new Array(resp.body['totalPages']);
      this.firstClientIndex = resp.body['firstElement'];
      this.lastClientIndex = resp.body['lastElement'];
    });
  }


}




