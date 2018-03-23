import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Network } from '../model/Network';
import { user } from '../model/user';
@Injectable()
export class QueryServiceService {
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });
  constructor(private http:Http) { }

  getQueriesByUser(username : string){
    let url = Network.API_URL+"query/Number/"+username;
    return this.http.get(url);
  }
  getQueriesListByUser(username : string){
    let url = Network.API_URL+"query/Queries/"+username;
    return this.http.get(url);
  }
  postAnswerQuery(query:Object){
    let url: string =Network.API_URL+"query/answer";
    return this.http.post(url, query,{headers: this.headers})
  }
  getQueryBySeller(User : user){
    let url = Network.API_URL+"query/queryBySeller/"+User.username;
    return this.http.get(url);
  }
  getQueryByBuyer(User : user){
    let url = Network.API_URL+"query/queryByBuyer/"+User.username;
    return this.http.get(url);
  }
  getQueryBySellerAndStatus(User : user,status:string){
    let url = Network.API_URL+"query/queryBySellerAndStatus/"+User.username+"/"+status;
    return this.http.get(url);
  }
  getQueryByBuyerAndStatus(User : user,status:string){
    let url = Network.API_URL+"query/queryByBuyerAndStatus/"+User.username+"/"+status;
    return this.http.get(url);
  }
  deleteFavorite(queryId:number,User:user){
    let url = Network.API_URL+"query/delete/"+queryId;
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.get(url,{headers: headers});
  }
}
