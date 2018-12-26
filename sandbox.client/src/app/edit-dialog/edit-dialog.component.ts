import {Component, Inject, OnInit} from '@angular/core';
import {DialogData} from "../table/table.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit(): void {
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
