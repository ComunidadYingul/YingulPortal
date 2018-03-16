import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from '../model/Network';
@Injectable()
export class BankService {

  constructor(private http:Http) { }

  getAll(){
    let url = Network.API_URL+"bank/all";
    return this.http.get(url);
  }
}
