import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ItemsCategoryService {

  constructor(private http:Http) { }

  getItemsByCategory(categoryId:number) {
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/itemsCategory/"+categoryId;
    return this.http.get(url);
  }

}
