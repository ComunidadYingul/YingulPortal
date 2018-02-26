import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { WireTransfer } from '../model/wire-transfer';
import { user } from '../model/user';
@Injectable()
export class WireTransferService {
  User: user=new user();
  constructor(private http:Http) {
    this.User=JSON.parse(localStorage.getItem("user"));
   }
  getDataForUser(){
    let url = "http://ip-api.com/json";
    return this.http.get(url);
  }
  createWireTransfer(wireTransfer:WireTransfer){
    let url: string ='http://localhost:8080/wireTransfer/create';
    let headers = new Headers(
      {
        'Authorization': this.User.password
      });
    return this.http.post(url, wireTransfer,{headers: headers})
  }
}
