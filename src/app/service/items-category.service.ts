import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Network } from '../model/Network';
@Injectable()
export class ItemsCategoryService {

  constructor(private http:Http) { }

  getItemsByCategory(categoryId:number) {
    let url = Network.API_URL+"item/itemsCategory/"+categoryId;
    return this.http.get(url);
  }

}
