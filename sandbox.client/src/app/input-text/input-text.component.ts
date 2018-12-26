import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl} from '@angular/forms';
import {HttpService} from "../http.service";
import {PersonDisplay} from "../../model/PersonDisplay";
import {InputText} from "../../model/InputText";



@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})


export class InputTextComponent implements OnInit {

  public text: string;

  constructor(private http: HttpService) {
  }

  ngOnInit() {
  }

  onSubmit(message: string){
      console.log("data: ",message)

    this.http.post("/task/show-text", {
      text: message
    }, "text").toPromise().then(resp => InputText.of(resp.body));
  }

}
