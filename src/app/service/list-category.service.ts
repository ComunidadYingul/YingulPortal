import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ListCategoryService {
  constructor(private http:Http) { }

  getCategories(url1:string) {
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/category/"+url1;
    return this.http.get(url);
  }
  getSubCategories(url1:string){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/category/father/"+url1;
    return this.http.get(url);
  }

}
