import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Network } from '../model/Network';
@Injectable()
export class CategoryService {

  constructor(private http:Http) { }
  getCategoriesByNane(name:string) {
    let url = Network.API_URL+"category/categories/"+name;
    return this.http.get(url);
  }
  getBestMatch(name:string){
    let url = Network.API_URL+"category/bestMatch/"+name;
    return this.http.get(url);
  } 
  getCategoryById(categoryId:number){
    let url = Network.API_URL+"category/getCategory/"+categoryId;
    return this.http.get(url);
  }
  getTypeItemCategory(categoryId:number){
    let url = Network.API_URL+"category/getTypeCategory/"+categoryId;
    return this.http.get(url);
  }
}
