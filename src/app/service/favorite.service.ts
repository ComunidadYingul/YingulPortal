import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class FavoriteService {
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });
  constructor(private http:Http) { 
    
  }
  createFavorite(itemId:number,username:string){
    let url = "http://192.168.100.12:8080/favorite/create/"+itemId+"/"+username;
    return this.http.get(url);
  }
  deleteFavorite(itemId:number,username:string){
    let url = "http://192.168.100.12:8080/favorite/delete/"+itemId+"/"+username;
    return this.http.get(url);
  }
  getFavorite(username:string){
    let url = "http://192.168.100.12:8080/favorite/getFavorite/"+username;
    return this.http.get(url);
  }
  deleteFavorites(deleteList:number[]){
    let url: string ='http://192.168.100.12:8080/favorite/deleteFavorites';
    return this.http.post(url, deleteList,{headers: this.headers})
  }
  getItemFavorite(username:string){
    let url = "http://192.168.100.12:8080/favorite/getItemFavorite/"+username;
    return this.http.get(url);
  }
}
