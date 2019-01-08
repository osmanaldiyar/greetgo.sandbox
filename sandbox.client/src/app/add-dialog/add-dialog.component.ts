import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../table/table.component";
import {HttpService} from "../http.service";
import {ClientDetails} from "../../model/ClientDetails";
import {Client} from "../models/client";
import {toPromise} from "rxjs-compat/operator/toPromise";

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
  characterInput: string = '';
  regStreetInput: string = '';
  regHouseInput: string = '';
  regFlatInput: string = '';
  mobileInput: string = '';
  //


  addNumber: boolean = false;
  addNumber2: boolean = false;
  addNumber3: boolean = false;
  addNumber4: boolean = false;
  addNumber5: boolean = false;
  year: Array<string> = [];
  selectedGender: string = "";
  phoneTypes:Array<string> = ["Home number","Work number", "Mobile"];
  addClientDetails: ClientDetails = new ClientDetails();
  addClientRecord: Client = new Client();
  inputIsEmpty: boolean = true;

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


  onAddClientClick(surname:string, name:string, patronymic: string,gender: string, dateOfBirth: string , character: string,
                   street:string, house:string, flatNumber: string,registeredStreet:string, registeredHouse:string, registeredFlatNumber: string,
                   phoneNumber1:string,phoneNumber2:string,phoneNumber3:string,phoneNumber4:string,phoneNumber5:string){

    console.log("add dialog -> save changes pressed", surname,name,patronymic,dateOfBirth,character,street,house,flatNumber,
      registeredStreet,registeredFlatNumber,registeredHouse,phoneNumber1,phoneNumber2,phoneNumber3,phoneNumber4,phoneNumber5);

    var d = new Date();

    console.log("Gender ",this.selectedGender)
    this.addClientDetails.gender = this.selectedGender;
    this.addClientDetails.dateOfBirth = d;
    this.addClientDetails.street = street;
    this.addClientDetails.house = house;
    this.addClientDetails.flatNumber = flatNumber;
    this.addClientDetails.registeredStreet = registeredStreet;
    this.addClientDetails.registeredFlatNumber = registeredFlatNumber;
    this.addClientDetails.registeredHouse = registeredHouse;

    this.addClientRecord.FIO = surname + " " + name + " " + patronymic;
    this.addClientRecord.character = character;

    var d = new Date();
    //this.year = dateOfBirth.toString().split("-");
    var currentYear: number = d.getFullYear();

    //this.addClientRecord.age = currentYear - parseInt(this.year[0]);
    this.addClientRecord.age = 21;
    console.log("dateofbirth ",dateOfBirth);
    console.log("clientage ",this.addClientRecord.age);

    console.log(this.addClientRecord.FIO);

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
      min_cash_rem: this.addClientRecord.min_remainings
    }, "text").toPromise().then(resp => resp.body as string);


  }

  inputsIsEmpty(){
    //console.log('dateOfbirthInput ',this.dateOfBirthInput);
    if (this.surnameInput != '' && this.nameInput != '' && this.characterInput != '' && this.dateOfBirthInput !='' &&
      this.selectedGender != '' && this.regStreetInput !='' && this.regHouseInput != '' && this.regFlatInput != '' && this.mobileInput !='') {
      this.inputIsEmpty = false;
    }
    else{
      this.inputIsEmpty = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }



}
