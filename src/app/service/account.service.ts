import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { user } from '../model/user';
import { Network } from '../model/Network';
@Injectable()
export class AccountService {
  User: user=new user();
  constructor(private http:Http) { 
    
  }
  getAccountByUser(username:string) {
    this.User=JSON.parse(localStorage.getItem("user"));
    let url = Network.API_URL+"account/getAccountByUser/"+username;
    let headers = new Headers(
      {
        'Authorization': this.User.password
      });
    return this.http.get(url,{headers: headers});
    //verificar esta parte
  }
  getTransactionByUser(username:string){
    let url = Network.API_URL+"account/getTransactionsByUser/"+username;
    return this.http.get(url);
  }
}
