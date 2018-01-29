import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class IndexService {

  constructor(private http:Http) { }
  getItems() {
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/index/item/all";
    return this.http.get(url);
  }
}
