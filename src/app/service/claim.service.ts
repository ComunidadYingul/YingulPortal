import { Injectable } from '@angular/core';
import { Claim } from '../model/claim';
import {Http, Headers} from '@angular/http';
import { user } from '../model/user';

@Injectable()
export class ClaimService {

  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });
  constructor(private http:Http) { }
  saveClaim(claim:Claim){
    let _url: string ='http://localhost:8080/claim/createClaim';
    return this.http.post(_url, claim,{headers: this.headers})
  }
  getClaimById(claimId:number, User:user) {
    let url = "http://localhost:8080/claim/getClaimById/"+claimId;
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.get(url,{headers: headers});
  }
}
