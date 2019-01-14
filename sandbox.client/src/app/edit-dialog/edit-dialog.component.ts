import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Client} from "../models/client";
import {ClientDetails} from "../../model/ClientDetails";
import {HttpService} from "../http.service";
import {ClientPhoneNumber} from "../../model/ClientPhoneNumber";
import {ClientAddress} from "../../model/ClientAddress";
import {ClientRegisteredAddress} from "../../model/ClientRegisteredAddress";
import {ClientsPageService} from "../table/clients-page.service";




@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpService, private clientsPageService: ClientsPageService) {
    console.log("Client",data.fio + " came to edit")
  }

  phoneTypes:Array<string> = ["Home","Work", "Mobile"];
  characterTypes:Array<string> = ["Humble","Angry", "Crazy","Lazy","Nervous","Hardworking"];

  clientDetails: ClientDetails = new ClientDetails();
  clientAddress: ClientAddress = new ClientAddress();
  clientRegisteredAddress = new ClientRegisteredAddress();
  clientRecord: Client = new Client();

  clientPhoneNumbers: Array<ClientPhoneNumber> = [];
  clientTempPhone: ClientPhoneNumber = new ClientPhoneNumber();
  warning: Array<string> = [];

  //inputs
  surnameInput:string = '';
  nameInput:string = '';
  patronymicInput:string = '';

  //

  inputIsEmpty: boolean = true;



  ngOnInit(): void {
    console.log("ngOnInit--------idddd ",this.data.client.id);
    this.clientTempPhone.id = 0;
    this.clientTempPhone.phoneNumber = "";
    this.clientTempPhone.phoneType = "Mobile";
    this.clientPhoneNumbers.push(this.clientTempPhone);
    console.log("array id ",this.data.client.indexInArray);
  }



  onEditClient(){

    //ClientDetails----------------------------------------------------
    this.clientDetails.dateOfBirth = this.clientDetails.dateOfBirth;
    this.clientDetails.clientAddress = this.clientAddress;
    this.clientDetails.registeredAddress = this.clientRegisteredAddress;

    this.clientDetails.clientAddress = this.clientAddress;
    this.clientDetails.registeredAddress = this.clientRegisteredAddress;
    this.clientDetails.phoneNumbers = this.clientPhoneNumbers;
    //ClientDetails------------------------------------------------------




    //ClientRecord------------------------------------------------------

    this.clientRecord.id = this.data.client.id;
    this.clientRecord.FIO = this.surnameInput + " " + this.nameInput + " " + this.patronymicInput;
    console.log("FIO ",this.clientRecord.FIO);


    //calculate year

      console.log("age is ok", this.clientRecord.age);
      var d = new Date();
      var year = this.clientDetails.dateOfBirth.toString().split("-");
      this.clientRecord.age = d.getFullYear() - parseInt(year[0]);

      this.clientRecord.character = this.clientRecord.character;
      this.clientRecord.total_cash_remainings = this.data.client.total_cash_rem;
      this.clientRecord.max_remainings = this.data.client.max_rem;
      this.clientRecord.min_remainings = this.data.client.min_rem;


    //ClientRecord end----------------------------------------------------

    console.log(this.clientRecord);
    console.log(this.clientDetails);

    this.http.post("/list/edit", {
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
    console.log("phone id ",i);
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
