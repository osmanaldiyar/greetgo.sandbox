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

  addNumber: boolean = false;
  addNumber2: boolean = false;
  addNumber3: boolean = false;
  addNumber4: boolean = false;
  addNumber5: boolean = false;
  phoneTypes:Array<string> = ["Home number","Work number", "Mobile"];

  ngOnInit() {
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


  onAddClientClick(surname:string, name:string){

  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }


}
