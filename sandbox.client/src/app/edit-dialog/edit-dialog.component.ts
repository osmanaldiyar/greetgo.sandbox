import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Client} from "../models/client";
import {ClientDetails} from "../../model/ClientDetails";
import {HttpService} from "../http.service";




@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpService) {
    console.log("Client",data.fio + " came to edit")
  }

  selectedGender: string = "";
  phoneTypes:Array<string> = ["Home","Work", "Mobile"];
  characterTypes:Array<string> = ["Humble","Angry", "Crazy","Lazy","Nervous","Hardworking"];
  addClientDetails: ClientDetails = new ClientDetails();
  addClientRecord: Client = new Client();

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

  inputIsEmpty: boolean = true;
  phoneNumberCounter: number = 0;

  //remove phone flags
  phoneInputIsVisible2:boolean = false;
  phoneInputIsVisible3:boolean = false;
  phoneInputIsVisible4:boolean = false;
  phoneInputIsVisible5:boolean = false;
  warning: string = "";

  ngOnInit(): void {

    console.log("ngOnInit--------idddd ",this.data.client.id);
  }



  onEditClient(surname:string, name:string, patronymic: string, dateOfBirth: string ,
               street:string, house:string, flatNumber: string,registeredStreet:string, registeredHouse:string, registeredFlatNumber: string){

    console.log("add dialog -> save changes pressed", surname,name,patronymic,dateOfBirth,this.characterOption,street,house,flatNumber,
      registeredStreet,registeredFlatNumber,registeredHouse,this.mobileInput,this.mobileInput2,this.mobileInput3,this.mobileInput4,this.mobileInput5);

    console.log("onEditClient--------idddd ",this.data.id);
    // console.log("--------fio ",this.data.fio);

    this.addClientRecord.id = this.data.client.id;
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

    this.http.post("/list/edit", {
      id: this.addClientRecord.id,
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
      registeredFlatNumber: this.addClientDetails.registeredFlatNumber,
      phoneNumber1: this.addClientDetails.phoneNumber1,
      phoneNumber2: this.addClientDetails.phoneNumber2,
      phoneNumber3: this.addClientDetails.phoneNumber3,
      phoneNumber4: this.addClientDetails.phoneNumber4,
      phoneNumber5: this.addClientDetails.phoneNumber5
    }, "text").toPromise().then(resp => resp.body as string);



  }

  inputsIsEmpty(){
    //console.log('dateOfbirthInput ',this.dateOfBirthInput);
    if (this.surnameInput != '' && this.nameInput != '' && this.characterOption != '' && this.dateOfBirthInput !='' &&
      this.selectedGender != '' && this.regStreetInput !='' && this.regHouseInput != '' && this.regFlatInput != '' && this.mobileInput !='') {
      this.inputIsEmpty = false;
    }else{
      this.inputIsEmpty = true;
    }
    //console.log("this.mobile1[0] ", this.mobileInput.length);
    if(this.mobileInput[0] != "8"){
      this.warning = "\n phone number should start with 8";
    }else if(this.mobileInput[1] != "7"){
      this.warning = "\n Illegal operator code. Examples of operators(705,745,707,701)";
    }else{
      this.warning = "";
    }

    //console.log("this.mobile1[0] ", this.mobileInput.length);
    console.log("type",typeof(this.mobileInput[0]));
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
