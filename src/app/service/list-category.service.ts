import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Network } from '../model/Network';
@Injectable()
export class ListCategoryService {
  constructor(private http:Http) { }

  getCategories(url1:string) {
    let url = Network.API_URL+"category/"+url1;
    let headers = new Headers(
      {
        'X-API-KEY': Network.API_KEY
      });
    return this.http.get(url,{headers: headers});
  }
  getSubCategories(url1:string){
    let url = Network.API_URL+"category/father/"+url1;
    return this.http.get(url);
  }

}
