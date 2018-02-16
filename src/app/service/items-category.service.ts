import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ItemsCategoryService {

  constructor(private http:Http) { }

  getItemsByCategory(categoryId:number) {
    let url = "http://192.168.100.12:8080/item/itemsCategory/"+categoryId;
    return this.http.get(url);
  }

}
