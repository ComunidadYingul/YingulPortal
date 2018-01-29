import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class UbicationService {

  constructor(private http:Http) { }
  getCitiesByName(name:string) {
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/ubication/cities/"+name;
    return this.http.get(url);
  }
}
