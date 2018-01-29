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
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/itemType/"+itemId;
    return this.http.get(url);
  }
  getItem(typeItem: string,itemId : number){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/"+typeItem+"/"+itemId;
    //la url determina el tipo de item que estamos solicitando al backend
    return this.http.get(url);
  }
  getSeller(itemId:number){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/Seller/"+itemId;
    return this.http.get(url);
  }
  getItemsBySeller(username:string){
    username=username.replace(/['"]+/g, '');
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/Item/"+username;
    return this.http.get(url);
  }
  getImageByItem(itemId : number){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/Image/"+itemId;
    return this.http.get(url);
  }
  getCategoriesByItem(itemId : number){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/Categories/"+itemId;
    return this.http.get(url);
  }
  getQueryByItem(itemId : number){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/Query/"+itemId;
    return this.http.get(url);
  }
  getItemById(itemId : number){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/ItemById/"+itemId;
    return this.http.get(url);
  }

  sendCotiza(cotizar : Object){
    //let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/logistics/cotizarItem";
    
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/logistics/cotizarItemA";
    return this.http.post(url,cotizar, {headers: this.headers});
  }
  sendCotizaAndreani(cotizar : Object){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/logistics/cotizarAndreani";
    return this.http.post(url,cotizar, {headers: this.headers});
  }

  sendCotizacionAndreani(cotizar : Object){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/logistics/cotizacion";
    return this.http.post(url,cotizar, {headers: this.headers});
  }
  urlHost:string="http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/";
  sendSucursalAndreani(sucursal:Object){
    let url=this.urlHost+"logistics/branch";
    return this.http.post(url,sucursal, {headers: this.headers});
  }


  //aumentar a los header lo de seguridad autenticacion basica
  postQuery(query:Object){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/query";
    return this.http.post(url ,query, {headers: this.headers});
  }

}

