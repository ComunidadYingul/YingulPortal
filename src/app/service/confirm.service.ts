import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Confirm } from '../model/confirm';
@Injectable()
export class ConfirmService {
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });
  constructor(private http:Http) { }
  getConfirm(confirmId:number){
    let url = "http://localhost:8080/confirm/getConfirmForId/"+confirmId;
    return this.http.get(url);
  }
  updateConfirm(confirm:Confirm){
    let _url: string ='http://localhost:8080/confirm/updateConfirm';
    return this.http.post(_url, confirm,{headers: this.headers})
  }
}
