import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ItemDetailService {
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });
  constructor(private http:Http) { }
  getItemType(itemId : number) {
    let url = "http://localhost:8080/item/itemType/"+itemId;
    return this.http.get(url);
  }
  getItem(typeItem: string,itemId : number){
    let url = "http://localhost:8080/item/"+typeItem+"/"+itemId;
    //la url determina el tipo de item que estamos solicitando al backend
    return this.http.get(url);
  }
  getSeller(itemId:number){
    let url = "http://localhost:8080/item/Seller/"+itemId;
    return this.http.get(url);
  }
  getItemsBySeller(username:string){
    username=username.replace(/['"]+/g, '');
    let url = "http://localhost:8080/item/Item/"+username;
    return this.http.get(url);
  }
  getImageByItem(itemId : number){
    let url = "http://localhost:8080/item/Image/"+itemId;
    return this.http.get(url);
  }
  getCategoriesByItem(itemId : number){
    let url = "http://localhost:8080/item/Categories/"+itemId;
    return this.http.get(url);
  }
  getQueryByItem(itemId : number){
    let url = "http://localhost:8080/item/Query/"+itemId;
    return this.http.get(url);
  }
  getItemById(itemId : number){
    let url = "http://localhost:8080/item/ItemById/"+itemId;
    return this.http.get(url);
  }

  sendCotiza(cotizar : Object){
    //let url = "http://localhost:8080/logistics/cotizarItem";
    
    let url = "http://localhost:8080/logistics/cotizarItemA";
    return this.http.post(url,cotizar, {headers: this.headers});
  }
  sendCotizaAndreani(cotizar : Object){
    let url = "http://localhost:8080/logistics/cotizarAndreani";
    return this.http.post(url,cotizar, {headers: this.headers});
  }

  sendCotizacionAndreani(cotizar : Object){
    let url = "http://localhost:8080/logistics/cotizacion";
    return this.http.post(url,cotizar, {headers: this.headers});
  }
  urlHost:string="http://localhost:8080/";
  sendSucursalAndreani(sucursal:Object){
    let url=this.urlHost+"logistics/branch";
    return this.http.post(url,sucursal, {headers: this.headers});
  }


  //aumentar a los header lo de seguridad autenticacion basica
  postQuery(query:Object){
    let url = "http://localhost:8080/item/query";
    return this.http.post(url ,query, {headers: this.headers});
  }
  
  getItemTypeEdit(itemId : number) {
    let url = "http://localhost:8080/item/type/"+itemId;
    return this.http.get(url);
  }

  getProductByIdItem(itemId : number){
    let url = "http://localhost:8080/item/product/"+itemId;
    return this.http.get(url);
  }
  postUpdateProduct(product:Object){
    let url = "http://localhost:8080/item/product/update";
    return this.http.post(url ,product, {headers: this.headers});
  }
  postUpdateMotorized(product:Object){
    let url = "http://localhost:8080/item/motorized/update";
    return this.http.post(url ,product, {headers: this.headers});
  }
  postUpdateProperty(product:Object){
    let url = "http://localhost:8080/item/property/update";
    return this.http.post(url ,product, {headers: this.headers});
  }
}

