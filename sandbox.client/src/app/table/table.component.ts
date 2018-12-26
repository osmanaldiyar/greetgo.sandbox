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

  games = [
    {
      "id":"1",
      "name": "DOTA 2",
      "genre": "Strategy"
    },
    {
      "id":"2",
      "name": "AOE 3",
      "genre": "Strategy"
    },
    {
      "id":"3",
      "name": "GTA 5",
      "genre": "RPG"
    },
    {
      "id":"4",
      "name": "Far Cry 3",
      "genre": "Action"
    },
    {
      "id":"5",
      "name": "GTA San Andreas",
      "genre": "RPG"
    },
    {
      "id":"6",
      "name": "Hitman",
      "genre": "Action"
    },
    {
      "id":"7",
      "name": "NFS MW",
      "genre": "Sport"
    },{
      "id":"8",
      "name": "Fifa 16",
      "genre": "Sport"
    },{
      "id":"9",
      "name": "NFS Sen 2",
      "genre": "Sport"
    },{
      "id":"10",
      "name": "Witcher Assasins on King",
      "genre": "Adventure"
    }
  ]


  public clients: Client[] = [
    {
      FIO: "Pushkin A.S.", character: "good", age: 110, total_cash_remainings: 40,
      max_remainings: 150, min_remainings: 160
    },
    {
      FIO: "Lermontov", character: "very good", age: 114, total_cash_remainings: 900,
      max_remainings: 500, min_remainings: 600
    },
    {
      FIO: "Gogol", character: "nice", age: 120, total_cash_remainings: 70,
      max_remainings: 40, min_remainings: 10
    }];



  constructor(public dialog: MatDialog) {
  }



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




