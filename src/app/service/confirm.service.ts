import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Confirm } from '../model/confirm';
import { Network } from '../model/Network';
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
    let url = Network.API_URL+"confirm/getConfirmForId/"+confirmId;
    return this.http.get(url);
  }
  updateConfirm(confirm:Confirm){
    let _url: string =Network.API_URL+"confirm/updateConfirm";
    return this.http.post(_url, confirm,{headers: this.headers})
  }
  getConfirmToClaimForUser(username:string){
    let url = Network.API_URL+"confirm/getConfirmToClaimForUser/"+username;
    return this.http.get(url);
  }
  updateConfirmApi(confirm:Confirm){
    let _url: string =Network.API_URL+"confirm/updateConfirm";
    return this.http.post(_url, confirm,{headers: this.headers})
  }
  getNumberPendingDeliveriesForUser(username:string){
    let url = Network.API_URL+"confirm/getNumberPendingDeliveriesForUser/"+username;
    return this.http.get(url);
  }
}
