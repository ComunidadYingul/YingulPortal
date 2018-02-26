import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { user } from '../model/user';

@Injectable()
export class AccountService {
  User: user=new user();
  constructor(private http:Http) { 
    
  }
  getAccountByUser(username:string) {
    this.User=JSON.parse(localStorage.getItem("user"));
    let url = "http://localhost:8080/account/getAccountByUser/"+username;
    let headers = new Headers(
      {
        'Authorization': this.User.password
      });
    return this.http.get(url,{headers: headers});
  }
  getTransactionByUser(username:string){
    let url = "http://localhost:8080/account/getTransactionsByUser/"+username;
    return this.http.get(url);
  }
}
