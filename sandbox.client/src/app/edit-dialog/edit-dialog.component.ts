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

  //GET
  clientRecordGET: Client = new Client();
  clientDetailsGET: ClientDetails = new ClientDetails();
  //

  clientPhoneNumber1: ClientPhoneNumber = new ClientPhoneNumber();
  clientPhoneNumber2: ClientPhoneNumber = new ClientPhoneNumber();
  clientPhoneNumber3: ClientPhoneNumber = new ClientPhoneNumber();
  clientPhoneNumber4: ClientPhoneNumber = new ClientPhoneNumber();
  clientPhoneNumber5: ClientPhoneNumber = new ClientPhoneNumber();

  clientPhoneNumbers: Array<ClientPhoneNumber> = [];

  //inputs
  surnameInput:string = '';
  nameInput:string = '';
  patronymicInput:string = '';
  mobileInput: string = '';
  mobileInput2: string = '';
  mobileInput3: string = '';
  mobileInput4: string = '';
  mobileInput5: string = '';
  //

  inputIsEmpty: boolean = true;
  phoneNumberCounter: number = 0;

  //remove phone flags
  phoneInputIsVisible2:boolean = false;
  phoneInputIsVisible3:boolean = false;
  phoneInputIsVisible4:boolean = false;
  phoneInputIsVisible5:boolean = false;
  warning: string = "";
  warning2: string = "";
  warning3: string = "";
  warning4: string = "";
  warning5: string = "";
  selectedPhoneType2: string = "";
  selectedPhoneType3: string = "";
  selectedPhoneType4: string = "";
  selectedPhoneType5: string = "";

  ngOnInit(): void {
    console.log("ngOnInit--------idddd ",this.data.client.id);
  }



  onEditClient(){

    //ClientDetails----------------------------------------------------
    this.clientDetails.dateOfBirth = this.clientDetails.dateOfBirth;
    this.clientDetails.clientAddress = this.clientAddress;
    this.clientDetails.registeredAddress = this.clientRegisteredAddress;


    //PhoneNumbers
    this.clientPhoneNumber1.id = 0;
    this.clientPhoneNumber1.phoneType = "Mobile";
    this.clientPhoneNumber1.phoneNumber = this.mobileInput;
    this.clientPhoneNumbers.push(this.clientPhoneNumber1);

    this.clientPhoneNumber2.id = 1;
    this.clientPhoneNumber2.phoneType = this.selectedPhoneType2;
    this.clientPhoneNumber2.phoneNumber = this.mobileInput2;
    this.clientPhoneNumbers.push(this.clientPhoneNumber2);

    this.clientPhoneNumber3.id = 2;
    this.clientPhoneNumber3.phoneType = this.selectedPhoneType3;
    this.clientPhoneNumber3.phoneNumber = this.mobileInput3;
    this.clientPhoneNumbers.push(this.clientPhoneNumber3);

    this.clientPhoneNumber4.id = 3;
    this.clientPhoneNumber4.phoneType = this.selectedPhoneType4;
    this.clientPhoneNumber4.phoneNumber = this.mobileInput4;
    this.clientPhoneNumbers.push(this.clientPhoneNumber4);

    this.clientPhoneNumber5.id = 4;
    this.clientPhoneNumber5.phoneType = this.selectedPhoneType5;
    this.clientPhoneNumber5.phoneNumber = this.mobileInput5;
    this.clientPhoneNumbers.push(this.clientPhoneNumber5);

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

    //ClientRecord end----------------------------------------------------

    console.log(this.clientRecord);
    console.log(this.clientDetails);

    this.http.post("/list/edit", {
      clientRecord: JSON.stringify(this.clientRecord),
      clientDetails: JSON.stringify(this.clientDetails)
    }).toPromise().then(resp => {

    });


    /*this.http.post("/list/add", { id:"", obj: JSON.stringify({})}).toPromise().then(res=>{
      let assad = res.body;
    });*/



  }

  inputsIsEmpty(){
    //console.log('dateOfbirthInput ',this.dateOfBirthInput);

    //check for empty if field is empty submit is disabled
    if (this.surnameInput != '' && this.nameInput != '' && this.clientRecord.character != '' && this.clientDetails.dateOfBirth !='' &&
      this.clientDetails.gender != '' && this.clientAddress.street !='' && this.clientAddress.house != '' &&
      this.clientAddress.flatNumber != '' && this.mobileInput !='') {
      this.inputIsEmpty = false;
    }
    else{
      this.inputIsEmpty = true;
    }


    //check for format
    //console.log("this.mobile1[0] ", this.mobileInput.length);
    //console.log("type",typeof(this.mobileInput[0]));
    if(this.mobileInput != ""){
      if(!this.mobileInput.match("^[0-9]{0,15}$")){
        this.warning = "\n letters not allowed";
      }else if(this.mobileInput[0] != "8"){
        this.warning = "\n phone number should start with 8";
      }else if(this.mobileInput[1] != "7"){
        this.warning = "\n Illegal operator code. Examples of operators(705,745,707,701)";
      }else{
        this.warning = "";
      }
    }

    //check 2nd phone input
    if(this.selectedPhoneType2 == "Mobile") {
      if (this.mobileInput2 != "") {
        if (!this.mobileInput2.match("^[0-9]{0,15}$")) {
          this.warning2 = "\n letters not allowed";
        } else if (this.mobileInput2[0] != "8") {
          this.warning2 = "\n phone number should start with 8";
        } else if (this.mobileInput2[1] != "7") {
          this.warning2 = "\n Illegal operator code. Examples of operators(705,745,707,701)";
        } else {
          this.warning2 = "";
        }
      }
    }else{
      if (this.mobileInput2 != "") {
        if (!this.mobileInput2.match("^[0-9]{0,15}$")) {
          this.warning2 = "\n letters not allowed";
        }else {
          this.warning2 = "";
        }
      }
    }

    //check 3rd phone input
    if(this.selectedPhoneType3 == "Mobile") {
      if (this.mobileInput3 != "") {
        if (!this.mobileInput3.match("^[0-9]{0,15}$")) {
          this.warning3 = "\n letters not allowed";
        } else if (this.mobileInput3[0] != "8") {
          this.warning3 = "\n phone number should start with 8";
        } else if (this.mobileInput3[1] != "7") {
          this.warning3 = "\n Illegal operator code. Examples of operators(705,745,707,701)";
        } else {
          this.warning3 = "";
        }
      }
    }else{
      if (this.mobileInput3 != "") {
        if (!this.mobileInput3.match("^[0-9]{0,15}$")) {
          this.warning3 = "\n letters not allowed";
        }else {
          this.warning3 = "";
        }
      }
    }

    //check 4th phone input
    if(this.selectedPhoneType4 == "Mobile") {
      if (this.mobileInput4 != "") {
        if (!this.mobileInput4.match("^[0-9]{0,15}$")) {
          this.warning4 = "\n letters not allowed";
        } else if (this.mobileInput4[0] != "8") {
          this.warning4 = "\n phone number should start with 8";
        } else if (this.mobileInput4[1] != "7") {
          this.warning4 = "\n Illegal operator code. Examples of operators(705,745,707,701)";
        } else {
          this.warning4 = "";
        }
      }
    }else{
      if (this.mobileInput4 != "") {
        if (!this.mobileInput4.match("^[0-9]{0,15}$")) {
          this.warning4 = "\n letters not allowed";
        }else {
          this.warning4 = "";
        }
      }
    }

    //check 5th phone input
    if(this.selectedPhoneType5 == "Mobile") {
      if (this.mobileInput5 != "") {
        if (!this.mobileInput5.match("^[0-9]{0,15}$")) {
          this.warning5 = "\n letters not allowed";
        } else if (this.mobileInput5[0] != "8") {
          this.warning5 = "\n phone number should start with 8";
        } else if (this.mobileInput2[1] != "7") {
          this.warning5 = "\n Illegal operator code. Examples of operators(705,745,707,701)";
        } else {
          this.warning5 = "";
        }
      }
    }else{
      if (this.mobileInput5 != "") {
        if (!this.mobileInput5.match("^[0-9]{0,15}$")) {
          this.warning5 = "\n letters not allowed";
        }else {
          this.warning5 = "";
        }
      }
    }

  }


  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  //Dynamic phones
  addPhone(){
    if(this.phoneNumberCounter < 5){
      this.phoneNumberCounter++;
      if(this.phoneNumberCounter == 5){
        this.phoneNumberCounter--;
      }
    }
    //console.log("counter", this.phoneNumberCounter);
    if(this.phoneNumberCounter > 0){
      //console.log("Im here");
      this.phoneInputIsVisible2 = true;
      //console.log("2 isVisible :", this.phoneInputIsVisible2);
    }if(this.phoneNumberCounter > 1){
      this.phoneInputIsVisible3 = true;
      //console.log("3 isVisible :", this.phoneInputIsVisible2);
    }if(this.phoneNumberCounter > 2){
      this.phoneInputIsVisible4 = true;
      //console.log("4 isVisible :", this.phoneInputIsVisible2);
    }if(this.phoneNumberCounter > 3){
      this.phoneInputIsVisible5 = true;
      //console.log("5 isVisible :", this.phoneInputIsVisible2);
    }

  }



  removePhone2(){
    this.phoneNumberCounter--;
    this.phoneInputIsVisible2 = false;
  }

  removePhone3(){
    this.phoneNumberCounter--;
    this.phoneInputIsVisible3 = false;
  }

  removePhone4(){
    this.phoneNumberCounter--;
    this.phoneInputIsVisible4 = false;
  }

  removePhone5(){
    this.phoneNumberCounter--;
    this.phoneInputIsVisible5 = false;
  }


  //Validate phone



}
