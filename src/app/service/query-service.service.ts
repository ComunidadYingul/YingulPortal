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
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/query/Number/"+username;
    return this.http.get(url);
  }
  getQueriesListByUser(username : string){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/query/Queries/"+username;
    return this.http.get(url);
  }
  postAnswerQuery(query:Object){
    let url: string ='http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/query/answer';
    return this.http.post(url, query,{headers: this.headers})
  }
}
