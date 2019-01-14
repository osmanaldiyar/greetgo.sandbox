import {Component, Inject, OnInit, HostListener, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../table/table.component";
import {HttpService} from "../http.service";
import {ClientDetails} from "../../model/ClientDetails";
import {Client} from "../models/client";
import {ClientPhoneNumber} from "../../model/ClientPhoneNumber";
import {ClientAddress} from "../../model/ClientAddress";
import {ClientRegisteredAddress} from "../../model/ClientRegisteredAddress";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpService) { }


  //inputs
  surnameInput:string = '';
  nameInput:string = '';


  phoneTypes:Array<string> = ["Home","Work", "Mobile"];
  characterTypes:Array<string> = ["Humble","Angry", "Crazy","Lazy","Nervous","Hardworking"];

  clientDetails: ClientDetails = new ClientDetails();
  clientAddress: ClientAddress = new ClientAddress();
  clientRegisteredAddress = new ClientRegisteredAddress();
  clientRecord: Client = new Client();


  clientPhoneNumbers: Array<ClientPhoneNumber> = [];
  clientTempPhone: ClientPhoneNumber = new ClientPhoneNumber();
  warning: Array<string> = [];

  inputIsEmpty: boolean = true;





  ngOnInit() {
    this.clientTempPhone.id = 0;
    this.clientTempPhone.phoneNumber = "";
    this.clientTempPhone.phoneType = "Mobile";
    this.clientPhoneNumbers.push(this.clientTempPhone);
  }


  onAddClientClick(surname:string, name:string, patronymic: string){

    console.log("add dialog -> save changes pressed", surname,name,patronymic,);

    //ClientDetails----------------------------------------------------
    this.clientDetails.clientAddress = this.clientAddress;
    this.clientDetails.registeredAddress = this.clientRegisteredAddress;
    this.clientDetails.phoneNumbers = this.clientPhoneNumbers;
    //ClientDetails------------------------------------------------------


    //ClientRecord------------------------------------------------------
    this.clientRecord.FIO = surname + " " + name + " " + patronymic;

    //calculate year
    var d = new Date();
    var year = this.clientDetails.dateOfBirth.toString().split("-");
    this.clientRecord.age = d.getFullYear() - parseInt(year[0]);

    //account
    this.clientRecord.total_cash_remainings = 0;
    this.clientRecord.max_remainings = 0;
    this.clientRecord.min_remainings = 0;
    //ClientRecord end----------------------------------------------------

    console.log(this.clientRecord);
    console.log(this.clientDetails);

    this.http.post("/list/add", {
      clientRecord: JSON.stringify(this.clientRecord),
      clientDetails: JSON.stringify(this.clientDetails)
    }).toPromise().then(resp => {

    });


    this.dialogRef.close(this.clientRecord);

  }

  inputsIsEmpty(i: number){
    //console.log('dateOfbirthInput ',this.dateOfBirthInput);

    //check for empty if field is empty submit is disabled
    if (this.surnameInput != '' && this.nameInput != '' && this.clientRecord.character != '' && this.clientDetails.dateOfBirth !='' &&
      this.clientDetails.gender != '' && this.clientRegisteredAddress.registeredStreet !='' && this.clientRegisteredAddress.registeredHouse != '' &&
      this.clientRegisteredAddress.registeredFlatNumber != '' && this.clientPhoneNumbers[0].phoneNumber !='') {
      this.inputIsEmpty = false;
    }
    else{
      this.inputIsEmpty = true;
    }

    //check for format
    //console.log("this.mobile1[0] ", this.mobileInput.length);
    //console.log("type",typeof(this.mobileInput[0]));
    if(i) {
      if (this.clientPhoneNumbers[i].phoneNumber != "") {

        if(this.clientPhoneNumbers[i].phoneType == "Mobile"){
          if (!this.clientPhoneNumbers[i].phoneNumber.match("^[0-9]{0,15}$")) {
            this.warning[i] = "\n letters not allowed";
          } else if (this.clientPhoneNumbers[i].phoneNumber.charAt(0) != "8") {
            this.warning[i] = "\n phone number should start with 8";
          } else if (this.clientPhoneNumbers[i].phoneNumber.charAt(1) != "7") {
            this.warning[i] = "\n Illegal operator code. Examples of operators(705,745,707,701)";
          } else {
            this.warning[i] = "";
          }

        }else{
          if (!this.clientPhoneNumbers[i].phoneNumber.match("^[0-9]{0,15}$")) {
            this.warning[i] = "\n letters not allowed";
          }else {
            this.warning[i] = "";
          }
        }

      }
    }else if(i == 0){
      if (this.clientPhoneNumbers[i].phoneNumber != "") {

        if(this.clientPhoneNumbers[i].phoneType == "Mobile"){
          if (!this.clientPhoneNumbers[i].phoneNumber.match("^[0-9]{0,15}$")) {
            this.warning[i] = "\n letters not allowed";
          } else if (this.clientPhoneNumbers[i].phoneNumber.charAt(0) != "8") {
            this.warning[i] = "\n phone number should start with 8";
          } else if (this.clientPhoneNumbers[i].phoneNumber.charAt(1) != "7") {
            this.warning[i] = "\n Illegal operator code. Examples of operators(705,745,707,701)";
          } else {
            this.warning[i] = "";
          }

        }else{
          if (!this.clientPhoneNumbers[i].phoneNumber.match("^[0-9]{0,15}$")) {
            this.warning[i] = "\n letters not allowed";
          }else {
            this.warning[i] = "";
          }
        }

      }
    }


  }

  onNoClick(): void {
    this.dialogRef.close("undefined");
  }


  //Dynamic phones
  addPhone(i: number, phoneNumber: string, phoneType: string) {

    var p = new ClientPhoneNumber();
    p.id = i;
    if(i == 0){
      p.phoneType = "Mobile";
    }else{
      p.phoneType = phoneType;
    }
    p.phoneNumber = phoneNumber;
    if (i < 5){
      this.clientPhoneNumbers.push(p);
    }
  }

  deletePhone(i: number){
    if(i != 0){
      this.clientPhoneNumbers.splice(i,1);
    }

  }




  //Validate phone


}
