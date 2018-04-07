import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Network } from '../model/Network';
@Injectable()
export class IndexService {

  constructor(private http:Http) { }
  getItems() {
    let url = Network.API_URL+"index/item/all";
    let headers = new Headers(
      {
        'X-API-KEY': Network.API_KEY
      });
    return this.http.get(url,{headers: headers});
  }
  getItem20first(){
    let url = Network.API_URL+"index/item/20first";
    let headers = new Headers(
      {
        'X-API-KEY': Network.API_KEY
      });
    return this.http.get(url,{headers: headers});
  }
  getProduct() {
    let url = Network.API_URL+"item/product/all";
    return this.http.get(url);
  }
}
