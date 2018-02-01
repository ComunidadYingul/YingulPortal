import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Store } from '../model/store'; 

@Injectable()
export class StoreService {
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });

  constructor(private http:Http) { }
  createStore(store:Store){
    let _url: string ='http://localhost:8080/store/create';
    return this.http.post(_url, store,{headers: this.headers});
  }
  findStoreByName(nameStore:string){
    let url = "http://localhost:8080/store/findByName/"+nameStore;
    return this.http.get(url);
  }
}
