import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ItemService {

  constructor(private http:Http) { }
  getServices() {
    let url = "http://localhost:8080/item/service/all";
    return this.http.get(url);
  }
  getMotorized(){
    let url = "http://localhost:8080/item/motorized/all";
    return this.http.get(url);
  }
  getFindMotorized(categoryId:string){
    let url = "http://localhost:8080/item/findMotorized/"+categoryId;
    return this.http.get(url);
  }
  searchMotorized(categoryId:number, minPrice:number, maxPrice:number, minYear:number, maxYear:number){
    let url = "http://localhost:8080/item/searchMotorized/"+categoryId+"/"+minPrice+"/"+maxPrice+"/"+minYear+"/"+maxYear;
    return this.http.get(url);
  }
  getProperty(){
    let url = "http://localhost:8080/item/property/all";
    return this.http.get(url);
  }
  searchProperty(categoryId:number,cityId:number){
    let url = "http://localhost:8080/item/searchProperty/"+categoryId+"/"+cityId;
    return this.http.get(url);
  }
  getItemsByCategory(categoryId:number) {
    let url = "http://localhost:8080/item/itemsByCategory/"+categoryId;
    return this.http.get(url);
  }
  getItemsOver(sw:boolean){
    let url = "http://localhost:8080/item/over/"+sw;
    return this.http.get(url);
  }
}
