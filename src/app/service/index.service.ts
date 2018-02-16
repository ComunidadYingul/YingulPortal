import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class IndexService {

  constructor(private http:Http) { }
  getItems() {
    let url = "http://192.168.100.12:8080/index/item/all";
    return this.http.get(url);
  }
  getProduct() {
    let url = "http://192.168.100.12:8080/item/product/all";
    return this.http.get(url);
  }
}
