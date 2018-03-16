import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Network } from '../model/Network';
@Injectable()
export class UbicationService {

  constructor(private http:Http) { }
  getCitiesByName(name:string) {
    let url = Network.API_URL+"ubication/cities/"+name;
    return this.http.get(url);
  }
}
