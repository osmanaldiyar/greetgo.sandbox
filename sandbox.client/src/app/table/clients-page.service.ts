import { Injectable } from '@angular/core';
import {HttpService} from "../http.service";
import {PersonDisplay} from "../../model/PersonDisplay";

@Injectable({
  providedIn: 'root'
})
export class ClientsPageService {

  constructor(private http: HttpService) { }

  getClients(page: number, sortAttribute:string, orderBy:string, searchSurname:string, searchName:string, searchPatronymic:string,rows:number){

    return "/list?page="+page+"&sortAttribute="+sortAttribute+"&orderBy="+orderBy+"&searchSurname="+searchSurname+"&searchName="+searchName+"&searchPatronymic="+searchPatronymic+"&rows="+rows;

  }

}
