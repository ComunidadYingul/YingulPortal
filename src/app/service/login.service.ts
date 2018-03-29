import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import { Network } from '../model/Network';
import { user } from '../model/user';
import { ResetPassword } from '../model/reset-password';
@Injectable()
export class LoginService {
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });
  constructor (private http: Http) {}

  sendCredential(username: string, password: string) {
    let url = Network.API_URL+"index";
    let params = 'username='+username+'&password='+password;
    let headers = new Headers(
    {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Access-Control-Allow-Credentials' : true
    });
    return this.http.post(url, params, {headers: headers, withCredentials : true});
  }

  logout() {
    let url = Network.API_URL+"logout";
    return this.http.get(url, { withCredentials: true });
  }
  sendRecoveryEmail(user: user) {
    let url = Network.API_URL+"login/sendRecoveryEmail";
    return this.http.post(url, user,{headers: this.headers})
  }
  checkAuthorization(resetPasswordId:number){
    let url = Network.API_URL+"login/checkAuthorization/"+resetPasswordId;
    return this.http.get(url);
  }
  updatePasswordUser(resetPassword:ResetPassword){
    let url: string =Network.API_URL+"login/updatePasswordUser";
    alert(JSON.stringify(resetPassword));
    console.log(JSON.stringify(resetPassword));
    return this.http.post(url, resetPassword,{headers: this.headers});
  }

}