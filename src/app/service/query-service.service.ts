import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

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
    let url = "http://localhost:8080/query/Number/"+username;
    return this.http.get(url);
  }
  getQueriesListByUser(username : string){
    let url = "http://localhost:8080/query/Queries/"+username;
    return this.http.get(url);
  }
  postAnswerQuery(query:Object){
    let url: string ='http://localhost:8080/query/answer';
    return this.http.post(url, query,{headers: this.headers})
  }
}
