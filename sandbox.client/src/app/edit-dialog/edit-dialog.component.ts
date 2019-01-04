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

    addNumber: boolean = false;
    addNumber2: boolean = false;
    addNumber3: boolean = false;
    addNumber4: boolean = false;
    addNumber5: boolean = false;
    phoneTypes:Array<string> = ["Home number","Work number", "Mobile"];

    ngOnInit(): void {


    }

    addPhoneNumber(){
      this.addNumber = !this.addNumber;
    }
    addPhoneNumber2(){
      this.addNumber2 = !this.addNumber2;
    }
    addPhoneNumber3(){
      this.addNumber3 = !this.addNumber3;
    }
    addPhoneNumber4(){
      this.addNumber4 = !this.addNumber4;
    }
    addPhoneNumber5(){
      this.addNumber5 = !this.addNumber5;
    }


  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

}
