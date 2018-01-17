import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { user } from '../model/user';
import { Service } from '../model/service'; 
import {Observable}  from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Product } from '../model/product';
import { Property } from '../model/Property';
import { Motorized } from '../model/Motorized';

@Injectable()
export class SellService {
  User: object;
  username: string;
  API_URL="http://localhost:8080/";
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });

  constructor(private http:Http) { }
  getUser() {
    this.User=JSON.parse(localStorage.getItem("user"));
    this.username=JSON.stringify(JSON.parse(JSON.stringify(this.User)).username);
    this.username=this.username.replace(/['"]+/g, '');
    let url = "http://localhost:8080/user/"+this.username;
    return this.http.get(url);
  }
  getProvinces() {
    let url = "http://localhost:8080/ubication/province/all";
    return this.http.get(url);
  }
  getCities(provinceId:number){
    let url = "http://localhost:8080/ubication/city/"+provinceId;
    return this.http.get(url);
  }
  getBarrio(cityId:number){
    let url = "http://localhost:8080/ubication/barrio/"+cityId;
    return this.http.get(url);
  }
  saveService(service:Service){
    let _url: string ='http://localhost:8080/sell/service';
    return this.http.post(_url, service,{headers: this.headers})
  }

  saveProduct(product:Product){
    let _url: string ='http://localhost:8080/sell/product';
    return this.http.post(_url, product,{headers: this.headers})
  }

  saveProperty(property:Property){
    let _url: string ='http://localhost:8080/sell/property';
    return this.http.post(_url, property,{headers: this.headers})
  }

  saveMotorized(motorized:Motorized){
    let _url: string ='http://localhost:8080/sell/motorized';
    return this.http.post(_url, motorized,{headers: this.headers})
  }

  public _errorHandler(error: Response){
    console.error('Error Ocurred: '+error);
    return Observable.throw(error || 'Some error on server ocured');
  }

  getSecurity(){
    let url =this.API_URL+ "ubication/security"
    //let url ="http://localhost:8080/motorized/security";
    return this.http.get(url);    
  }

  getConfort(){
    let url =this.API_URL+ "ubication/confort";
    return this.http.get(url);    
  }
  getSound(){
    let url =this.API_URL+ "ubication/sound";
    return this.http.get(url);    
  }
  getExterior(){
    let url =this.API_URL+ "ubication/exterior";
    return this.http.get(url);    
  }
  getEquipment(){
    let url =this.API_URL+ "ubication/equipment";
    return this.http.get(url); 

  }

  getAmenities(){
    let url =this.API_URL+ "ubication/amenities";
    return this.http.get(url); 
  }

  

  getAmbient(){
    let url =this.API_URL+ "ubication/ambient";
    return this.http.get(url); 
  }
}
