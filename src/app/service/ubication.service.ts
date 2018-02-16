import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class UbicationService {

  constructor(private http:Http) { }
  getCitiesByName(name:string) {
    let url = "http://192.168.100.12:8080/ubication/cities/"+name;
    return this.http.get(url);
  }
}
