import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
@Injectable()
export class UserService {
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });
  constructor(private http:Http) { }
  getPerson(username:string){
    let url = "http://localhost:8080/user/person/"+username;
    return this.http.get(url);
  }
}
