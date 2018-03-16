import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Person } from '../model/person';
import { Business } from '../model/business';
import { Network } from '../model/Network';
@Injectable()
export class SingupService {
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json; charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true 
  });

  constructor(private http: Http) { }

  signUp(person : Person) {
    let url = Network.API_URL+"signup";
    //convertir objeto a string
    //alert(JSON.stringify(person));
    return this.http.post(url ,person, {headers: this.headers});
  }
  signUpBusiness(business : Business) {
    let url = Network.API_URL+"business";
    //convertir objeto a string
    //alert(JSON.stringify(person));
    return this.http.post(url ,business, {headers: this.headers});
  }


  private extractData(res: Response) {
    let body = res.json();
          return body.data || {};
      }
  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
      }
      private handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
      }	
}
