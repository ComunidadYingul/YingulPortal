import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { WireTransfer } from '../model/wire-transfer';
import { user } from '../model/user';
import { Network } from '../model/Network';
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
    let url: string =Network.API_URL+"wireTransfer/create";
    let headers = new Headers(
      {
        'Authorization': this.User.password
      });
    return this.http.post(url, wireTransfer,{headers: headers})
  }
  getAllWireTransfer(){
    let url = Network.API_URL+"wireTransfer/list/all";
    return this.http.get(url);
  }
  getToDoWireTransfer(){
    let url = Network.API_URL+"wireTransfer/list/toDo";
    return this.http.get(url);
  }
  getCompleteWireTransfer(){
    let url = Network.API_URL+"wireTransfer/list/complete";
    return this.http.get(url);
  }
  updateWireTransfer(wireTransferId:number){
    let url = Network.API_URL+"wireTransfer/update/"+wireTransferId;
    return this.http.get(url);
  }
}
