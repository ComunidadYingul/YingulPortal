import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class CategoryService {

  constructor(private http:Http) { }
  getCategoriesByNane(name:string) {
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/category/categories/"+name;
    return this.http.get(url);
  }
  getBestMatch(name:string){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/category/bestMatch/"+name;
    return this.http.get(url);
  } 
}
