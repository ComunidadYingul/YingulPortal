import { Injectable } from '@angular/core';
import { Email } from '../model/email';
import { Network } from '../model/Network';
import { Http } from '@angular/http';

@Injectable()
export class AboutService {

  constructor(private http:Http) { }
  createMail(email:Email){
    let url: string =Network.API_URL+"about/createMail";
    return this.http.post(url, email)
  }
}
