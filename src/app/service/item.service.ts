import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Network } from '../model/Network';
@Injectable()
export class ItemService {

  constructor(private http:Http) { }
  getServices() {
    let url = Network.API_URL+"item/service/all";
    return this.http.get(url);
  }
  getMotorized(){
    let url = Network.API_URL+"item/motorized/all";
    return this.http.get(url);
  }
  getOnlyMotorized(){
    let url = Network.API_URL+"item/onlyMotorized/all";
    return this.http.get(url);
  }
  getFindMotorized(categoryId:string){
    let url = Network.API_URL+"item/findMotorized/"+categoryId;
    return this.http.get(url);
  }
  searchMotorized(categoryId:number, minPrice:number, maxPrice:number, minYear:number, maxYear:number){
    let url = Network.API_URL+"item/searchMotorized/"+categoryId+"/"+minPrice+"/"+maxPrice+"/"+minYear+"/"+maxYear;
    return this.http.get(url);
  }
  getProperty(){
    let url = Network.API_URL+"item/property/all";
    return this.http.get(url);
  }
  searchProperty(categoryId:number,cityId:number){
    let url = Network.API_URL+"item/searchProperty/"+categoryId+"/"+cityId;
    return this.http.get(url);
  }
  getItemsByCategory(categoryId:number) {
    let url = Network.API_URL+"item/itemsByCategory/"+categoryId;
    return this.http.get(url);
  }
  getItemsOver(sw:boolean){
    let url = Network.API_URL+"item/over/"+sw;
    let headers = new Headers(
      {
        'X-API-KEY': Network.API_KEY
      });
    return this.http.get(url,{headers: headers});
  }
  getItemsByName(itemName:string){
    let url = Network.API_URL+"item/listItemByName/"+itemName+"/0/100";
    let headers = new Headers(
      {
        'X-API-KEY': Network.API_KEY
      });
    return this.http.get(url,{headers: headers});
  }
  getOver20first(sw:boolean){
    let url = Network.API_URL+"item/over20first/"+sw;
    let headers = new Headers(
      {
        'X-API-KEY': Network.API_KEY
      });
    return this.http.get(url,{headers: headers});
  }
  getProductsByCategory(categoryId:number){
    let url = Network.API_URL+"item/ProductsByCategory/"+categoryId;
    return this.http.get(url);
  }
  getMotorizedByCategory(categoryId:number){
    let url = Network.API_URL+"item/MotorizedByCategory/"+categoryId;
    return this.http.get(url);
  }
}
