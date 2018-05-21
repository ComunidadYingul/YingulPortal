import { Injectable } from '@angular/core';
import { user } from '../model/user';
import {Http, Headers} from '@angular/http';
import { Network } from '../model/Network';

@Injectable()
export class PaymentService {
  constructor(private http:Http) { }
  getPaymentById(paymentId:number, User:user) {
    let url = Network.API_URL+"payment/getPaymentById/"+paymentId;
    let headers = new Headers(
      {
        'Authorization': User.password
      });
    return this.http.get(url,{headers: headers});
  }

}
