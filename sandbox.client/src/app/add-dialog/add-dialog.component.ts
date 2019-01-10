import {Component, Inject, OnInit, HostListener} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../table/table.component";
import {HttpService} from "../http.service";
import {ClientDetails} from "../../model/ClientDetails";
import {Client} from "../models/client";

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
  dateOfBirthInput: string = '';
  characterOption: string = '';
  regStreetInput: string = '';
  regHouseInput: string = '';
  regFlatInput: string = '';
  mobileInput: string = '';
  mobileInput2: string = '';
  mobileInput3: string = '';
  mobileInput4: string = '';
  mobileInput5: string = '';
  //

  selectedGender: string = "";
  phoneTypes:Array<string> = ["Home","Work", "Mobile"];
  characterTypes:Array<string> = ["Humble","Angry", "Crazy","Lazy","Nervous","Hardworking"];
  addClientDetails: ClientDetails = new ClientDetails();
  addClientRecord: Client = new Client();
  inputIsEmpty: boolean = true;
  warning: string = "";
  warning2: string = "";
  warning3: string = "";
  warning4: string = "";
  warning5: string = "";
  selectedPhoneType2: string = "";
  selectedPhoneType3: string = "";
  selectedPhoneType4: string = "";
  selectedPhoneType5: string = "";
  //to pass the latest last page, because when adding user it gives previous of the last page when users divided equally
  lastPage: number;

  phoneNumberCounter: number = 0;

  //remove phone flags
  phoneInputIsVisible2:boolean = false;
  phoneInputIsVisible3:boolean = false;
  phoneInputIsVisible4:boolean = false;
  phoneInputIsVisible5:boolean = false;

  ngOnInit() {
  }


  onAddClientClick(surname:string, name:string, patronymic: string, dateOfBirth: string ,street:string, house:string,
                   flatNumber: string,registeredStreet:string, registeredHouse:string, registeredFlatNumber: string){

    console.log("add dialog -> save changes pressed", surname,name,patronymic,dateOfBirth,this.characterOption,street,house,flatNumber,
      registeredStreet,registeredFlatNumber,registeredHouse,this.mobileInput,this.mobileInput2,this.mobileInput3,this.mobileInput4,this.mobileInput5);


    console.log("Gender ",this.selectedGender)
    this.addClientDetails.gender = this.selectedGender;
    this.addClientDetails.dateOfBirth = dateOfBirth;
    this.addClientDetails.street = street;
    this.addClientDetails.house = house;
    this.addClientDetails.flatNumber = flatNumber;
    this.addClientDetails.registeredStreet = registeredStreet;
    this.addClientDetails.registeredFlatNumber = registeredFlatNumber;
    this.addClientDetails.registeredHouse = registeredHouse;
    this.addClientDetails.phoneNumber1 = this.mobileInput;
    this.addClientDetails.phoneNumber2 = this.mobileInput2;
    this.addClientDetails.phoneNumber3 = this.mobileInput3;
    this.addClientDetails.phoneNumber4 = this.mobileInput4;
    this.addClientDetails.phoneNumber5 = this.mobileInput5;

    this.addClientRecord.FIO = surname + " " + name + " " + patronymic;
    this.addClientRecord.character = this.characterOption;

    //calculate year
    var d = new Date();
    var year = dateOfBirth.toString().split("-");
    this.addClientRecord.age = d.getFullYear() - parseInt(year[0]);


    this.addClientRecord.total_cash_remainings = 21313;
    this.addClientRecord.max_remainings = 4313;
    this.addClientRecord.min_remainings = 1313;

    console.log(this.addClientRecord.total_cash_remainings,this.addClientRecord.max_remainings,this.addClientRecord.min_remainings);


    this.http.post("/list/add", {
      FIO: this.addClientRecord.FIO,
      age: this.addClientRecord.age,
      character: this.addClientRecord.character,
      total_cash_rem: this.addClientRecord.total_cash_remainings,
      max_cash_rem: this.addClientRecord.max_remainings,
      min_cash_rem: this.addClientRecord.min_remainings,
      gender: this.addClientDetails.gender,
      dateOfBirth: this.addClientDetails.dateOfBirth,
      street: this.addClientDetails.street,
      house: this.addClientDetails.house,
      flatNumber: this.addClientDetails.flatNumber,
      registeredStreet: this.addClientDetails.street,
      registeredHouse: this.addClientDetails.house,
      registeredFlatNumber: this.addClientDetails.registeredFlatNumber,
      phoneNumber1: this.addClientDetails.phoneNumber1,
      phoneNumber2: this.addClientDetails.phoneNumber2,
      phoneNumber3: this.addClientDetails.phoneNumber3,
      phoneNumber4: this.addClientDetails.phoneNumber4,
      phoneNumber5: this.addClientDetails.phoneNumber5,
      phoneType2: this.selectedPhoneType2,
      phoneType3: this.selectedPhoneType3,
      phoneType4: this.selectedPhoneType4,
      phoneType5: this.selectedPhoneType5

    }, "text").toPromise().then(resp => resp.body as string);


  }

  inputsIsEmpty(){
    //console.log('dateOfbirthInput ',this.dateOfBirthInput);

    //check for empty if field is empty submit is disabled
    if (this.surnameInput != '' && this.nameInput != '' && this.characterOption != '' && this.dateOfBirthInput !='' &&
      this.selectedGender != '' && this.regStreetInput !='' && this.regHouseInput != '' && this.regFlatInput != '' && this.mobileInput !='') {
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
