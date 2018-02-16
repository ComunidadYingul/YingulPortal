import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ListCategoryService {
  constructor(private http:Http) { }

  getCategories(url1:string) {
    let url = "http://192.168.100.12:8080/category/"+url1;
    return this.http.get(url);
  }
  getSubCategories(url1:string){
    let url = "http://192.168.100.12:8080/category/father/"+url1;
    return this.http.get(url);
  }

}
