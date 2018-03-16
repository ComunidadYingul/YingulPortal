import { Injectable } from '@angular/core';
import { user } from '../model/user';
import { Http, Headers } from '@angular/http';
import { Network } from '../model/Network';
@Injectable()
export class AdminService {

  constructor(private http:Http) { }
  isAdmin(User:user){
    let url: string = Network.API_URL+'admin/isAdmin';
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.get(url, {headers: headers});
  }
}
