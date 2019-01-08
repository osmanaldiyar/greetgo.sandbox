import {Component, Inject, OnInit} from '@angular/core';
import {DialogData} from "../table/table.component";
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpService) {
    console.log("Client",data.fio + " came to edit")
  }

  addNumber: boolean = false;
  addNumber2: boolean = false;
  addNumber3: boolean = false;
  addNumber4: boolean = false;
  addNumber5: boolean = false;
  selectedGender: string = "";
  phoneTypes:Array<string> = ["Home number","Work number", "Mobile"];
  addClientDetails: ClientDetails = new ClientDetails();
  addClientRecord: Client = new Client();

  //inputs
  editSurnameInput:string = '';
  editNameInput:string = '';
  editDateOfBirthInput: string = '';
  editCharacterInput: string = '';
  editRegStreetInput: string = '';
  editRegHouseInput: string = '';
  editRegFlatInput: string = '';
  editMobileInput: string = '';
  editMobileInput2: string = '';
  editMobileInput3: string = '';
  editMobileInput4: string = '';
  editMobileInput5: string = '';
  //

  inputIsEmpty: boolean = true;

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


  onEditClient(surname:string, name:string, patronymic: string, dateOfBirth: Date , character: string,
               street:string, house:string, flatNumber: string,registeredStreet:string, registeredHouse:string, registeredFlatNumber: string){

    console.log("add dialog -> save changes pressed", surname,name,patronymic,dateOfBirth,character,street,house,flatNumber,
      registeredStreet,registeredFlatNumber,registeredHouse,this.editMobileInput,this.editMobileInput2,this.editMobileInput3,this.editMobileInput4,this.editMobileInput5);

    console.log("Gender ",this.selectedGender)
    this.addClientRecord.id = this.data.id;
    this.addClientDetails.gender = this.selectedGender;
    this.addClientDetails.dateOfBirth = dateOfBirth;
    this.addClientDetails.street = street;
    this.addClientDetails.house = house;
    this.addClientDetails.flatNumber = flatNumber;
    this.addClientDetails.registeredStreet = registeredStreet;
    this.addClientDetails.registeredFlatNumber = registeredFlatNumber;
    this.addClientDetails.registeredHouse = registeredHouse;
    this.addClientDetails.phoneNumber1 = this.editMobileInput;
    this.addClientDetails.phoneNumber2 = this.editMobileInput2;
    this.addClientDetails.phoneNumber3 = this.editMobileInput3;
    this.addClientDetails.phoneNumber4 = this.editMobileInput4;
    this.addClientDetails.phoneNumber5 = this.editMobileInput5;

    this.addClientRecord.FIO = surname + " " + name + " " + patronymic;
    this.addClientRecord.character = character;

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
      min_cash_rem: this.addClientRecord.min_remainings
    }, "text").toPromise().then(resp => resp.body as string);


  }

  inputsIsEmpty(){
    //console.log('dateOfbirthInput ',this.dateOfBirthInput);
    if (this.editSurnameInput != '' && this.editNameInput != '' && this.editCharacterInput != '' && this.editDateOfBirthInput !='' &&
      this.selectedGender != '' && this.editRegStreetInput !='' && this.editRegHouseInput != '' && this.editRegFlatInput != '' && this.editMobileInput !='') {
      this.inputIsEmpty = false;
    }else{
      this.inputIsEmpty = true;
    }
  }


  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

}
