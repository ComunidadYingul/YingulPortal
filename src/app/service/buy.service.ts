import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import { Buy } from '../model/buy';
import { user } from '../model/user';
import { AndreaniEnvios } from '../model/andreaniEnvios';
@Injectable()
export class BuyService {
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });
  constructor(private http:Http) { }
  getListCreditCard() {
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/buy/listCreditCard/all";
    return this.http.get(url);
  }
  getCardProvider(listCreditCardId:string){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/buy/getCreditCardProvider/"+listCreditCardId;
    return this.http.get(url);
  }
  getCardForUser(username:string){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/buy/getCardForUser/"+username;
    return this.http.get(url);
  }
  saveBuy(buy:Buy){
    let _url: string ='http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/buy/createBuy';
    return this.http.post(_url, buy,{headers: this.headers})
  }
  saveEnvio(envio:AndreaniEnvios){
    let _url: string ='http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/logistics/envio';
    return this.http.post(_url, envio,{headers: this.headers})
  }
  updateUser(user:user){
    let _url: string ='http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/buy/updateUser';
    return this.http.post(_url, user,{headers: this.headers})
  }
  getSwForData(username:string){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/buy/getSwForUser/"+username;
    return this.http.get(url);
  }
  getDataForBuyer(){
    let url = "http://ip-api.com/json";
    return this.http.get(url);
  }
}
