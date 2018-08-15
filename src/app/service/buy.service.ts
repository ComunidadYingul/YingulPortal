import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Buy } from '../model/buy';
import { user } from '../model/user';
import { AndreaniEnvios } from '../model/andreaniEnvios';
import { Network } from '../model/Network';
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
    let url = Network.API_URL+"buy/listCreditCard/all";
    return this.http.get(url);
  }
  getCardProvider(listCreditCardId:string){
    let url = Network.API_URL+"buy/getCreditCardProvider/"+listCreditCardId;
    return this.http.get(url);
  }
  getCardForUser(username:string){
    let url = Network.API_URL+"buy/getCardForUser/"+username;
    return this.http.get(url);
  }
  saveBuy(buy:Buy){
    let _url: string =Network.API_URL+"buy/createBuy";
    return this.http.post(_url, buy,{headers: this.headers})
  }
  saveEnvio(envio:AndreaniEnvios){
    let _url: string =Network.API_URL+"logistics/envio";
    return this.http.post(_url, envio,{headers: this.headers})
  }
  updateUser(user:user){
    let _url: string =Network.API_URL+"buy/updateUser";
    return this.http.post(_url, user,{headers: this.headers})
  }
  getSwForData(username:string){
    let url = Network.API_URL+"buy/getSwForUser/"+username;
    return this.http.get(url);
  }
  getDataForBuyer(){
    let url = "http://ip-api.com/json";
    return this.http.get(url);
  }

  updateUserUbication(user:user){
    let _url: string =Network.API_URL+"buy/updateUserUbication";
    return this.http.post(_url, user,{headers: this.headers})
  }
  getSalesForUser(username:string){
    let url = Network.API_URL+"buy/getSalesByUser/"+username;
    return this.http.get(url);
  }
  getPurchasesForUser(username:string){
    let url = Network.API_URL+"buy/getPurchaseByUser/"+username;
    return this.http.get(url);
  }
  getStateShipping(number:string){
    let url = Network.API_URL+"buy/getStateBuy/"+number;
    return this.http.get(url);
  }
  getLinkPdf(number:string){
    let url = Network.API_URL+"buy/getTicket/"+number;
    return this.http.get(url);
  }
  setUserUbicationEditPersonalInfo(user:user){
    //let url: string = Network.API_URL+'admin/isAdmin';
    let headers = new Headers(
      {
        'Authorization': user.password
      });
    let _url: string =Network.API_URL+"user/setUserUbicationEditPersonalInfo";
    return this.http.post(_url, user,{headers: headers})// return this.http.get(url, {headers: headers});
  }
}
