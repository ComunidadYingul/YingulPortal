import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class CategoryService {

  constructor(private http:Http) { }
  getCategoriesByNane(name:string) {
    let url = "http://localhost:8080/category/categories/"+name;
    return this.http.get(url);
  }
}
