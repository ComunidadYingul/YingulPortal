import { Injectable } from '@angular/core';
import { user } from '../model/user';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AdminService {

  constructor(private http:Http) { }
  isAdmin(User:user){
    let url: string ='http://localhost:8080/admin/isAdmin';
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.get(url, {headers: headers});
  }
}
