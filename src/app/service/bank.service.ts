import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class BankService {

  constructor(private http:Http) { }

  getAll(){
    let url = "http://localhost:8080/bank/all";
    return this.http.get(url);
  }
}
