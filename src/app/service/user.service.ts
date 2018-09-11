import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Network } from '../model/Network';
import { user } from '../model/user';
import { Business } from '../model/business';
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
    let url = Network.API_URL+"user/person/"+username;
    return this.http.get(url);
  }
  getBusiness(username:string){
    let url = Network.API_URL+"user/business/"+username;
    return this.http.get(url);
  }
  updateUsername(newUser:user, User:user){
    let url = Network.API_URL+"user/updateUsername";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,newUser,{headers: headers});
  }
  updateEmail(newUser:user, User:user){
    let url = Network.API_URL+"user/updateEmail";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,newUser,{headers: headers});
  }
  updatePassword(newUser:user, User:user){
    let url = Network.API_URL+"user/updatePassword";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,newUser,{headers: headers});
  }
  updatePhones(newUser:user, User:user){
    let url = Network.API_URL+"user/updatePhones";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,newUser,{headers: headers});
  }
  updateBusinessName(business:Business, User:user){
    let url = Network.API_URL+"user/updateBusinessName";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,business,{headers: headers});
  }
  updateBusinessDocumentNumber(business:Business, User:user){
    let url = Network.API_URL+"user/updateBusinessDocumentNumber";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,business,{headers: headers});
  }
  updateUserDocument(newUser:user, User:user){
    let url = Network.API_URL+"user/updateUserDocument";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,newUser,{headers: headers});
  }
  updatePhone(newUser:user, User:user){
    let url = Network.API_URL+"user/updatePhone";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,newUser,{headers: headers});
  }
  updateVideo(newUser:user, User:user){
    let url = Network.API_URL+"user/updateVideo";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,newUser,{headers: headers});
  }
  updateProfilePhoto(newUser:user, User:user){
    let url = Network.API_URL+"user/updateProfilePhoto";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,newUser,{headers: headers});
  }
  updateProfileBanner(newUser:user, User:user){
    let url = Network.API_URL+"user/updateProfileBanner";
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.post(url,newUser,{headers: headers});
  }
  getProfilePhoto(User:user){
    let url = Network.API_URL+"user/getProfilePhoto/"+User.username;
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.get(url,{headers: headers});
  }
}
