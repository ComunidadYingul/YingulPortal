import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ItemService {

  constructor(private http:Http) { }
  getServices() {
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/service/all";
    return this.http.get(url);
  }
  getMotorized(){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/motorized/all";
    return this.http.get(url);
  }
  getFindMotorized(categoryId:string){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/findMotorized/"+categoryId;
    return this.http.get(url);
  }
  searchMotorized(categoryId:number, minPrice:number, maxPrice:number, minYear:number, maxYear:number){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/searchMotorized/"+categoryId+"/"+minPrice+"/"+maxPrice+"/"+minYear+"/"+maxYear;
    return this.http.get(url);
  }
  getProperty(){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/property/all";
    return this.http.get(url);
  }
  searchProperty(categoryId:number,cityId:number){
    let url = "http://backend-env.f366rbrhwz.us-west-2.elasticbeanstalk.com/item/searchProperty/"+categoryId+"/"+cityId;
    alert(url);
    return this.http.get(url);
  }
}
