import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from '../models/client';

import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {AddDialogComponent} from "../add-dialog/add-dialog.component";

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

  public clients: Client[] = [
    {
      FIO: "Pushkin", character: "good", age: 110, total_cash_remainings: 40,
      max_remainings: 150, min_remainings: 160
    },
    {
      FIO: "Lermontov", character: "very good", age: 114, total_cash_remainings: 900,
      max_remainings: 500, min_remainings: 600
    },
    {
      FIO: "Gogol", character: "nice", age: 120, total_cash_remainings: 70,
      max_remainings: 40, min_remainings: 10
    },
    {
      FIO: "Zack", character: "hero", age: 23, total_cash_remainings: 9000,
      max_remainings: 9000, min_remainings: 1000
    },
    {
      FIO: "Chuck", character: "movie-star", age: 24, total_cash_remainings: 9001,
      max_remainings: 9001, min_remainings: 1001
    },
    {
      FIO: "Boateng", character: "football-player", age: 25, total_cash_remainings: 9002,
      max_remainings: 9002, min_remainings: 1002
    }
  ];



  constructor(public dialog: MatDialog) {
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

  }

  openDialog(client: Client): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  openAddDialog(client: Client): void {
    const addDialogRef = this.dialog.open(AddDialogComponent, {
      width: '450px',
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

    this.clients.splice(selectedItem.param1, 1);
  }


}




