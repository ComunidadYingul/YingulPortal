import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class CategoryService {

  constructor(private http:Http) { }
  getCategoriesByNane(name:string) {
    let url = "http://192.168.100.12:8080/category/categories/"+name;
    return this.http.get(url);
  }
  getBestMatch(name:string){
    let url = "http://192.168.100.12:8080/category/bestMatch/"+name;
    return this.http.get(url);
  } 
  getCategoryById(categoryId:number){
    let url = "http://192.168.100.12:8080/category/getCategory/"+categoryId;
    return this.http.get(url);
  }
}
