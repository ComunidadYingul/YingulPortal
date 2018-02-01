import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class IndexService {

  constructor(private http:Http) { }
  getItems() {
    let url = "http://localhost:8080/index/item/all";
    return this.http.get(url);
  }
}
