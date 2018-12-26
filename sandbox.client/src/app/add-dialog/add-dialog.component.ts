import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../table/table.component";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit() {
    this.data.fio = "Pushkin A.S."
    this.data.character = "Good"
    this.data.age = 50
    this.data.total_cash_rem = 100
    this.data.max_rem = 9000
    this.data.min_rem = 1000
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }


}
