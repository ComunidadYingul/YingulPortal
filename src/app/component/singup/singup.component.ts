import { Component, OnInit, Input, ElementRef} from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { SingupService } from '../../service/singup.service';
import { Router } from '@angular/router';
import { Person } from '../../model/person';
import {Business} from '../../model/business';
import { SellService } from '../../service/sell.service'
import { Province } from '../../model/province';
import { City } from '../../model/city';
import { Barrio } from '../../model/barrio';
import { AuthService } from "angular2-social-login";
import { UserGoogle } from '../../model/userGoogle';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  person: Person = new Person();
 
  name: string;
  lastname: string;
  email: string;
  password: string;
  msg: string;
  condition:boolean;
  business:boolean=false;

  hidName:boolean=true;
  hidLastname:boolean=true;
  hidEmail:boolean=true;
  hidEmail2:boolean=true;
  popup_registro:boolean=true;
  popup_exist:boolean=true;
  popup_terminos:boolean=true;
  hidPassword:boolean=true;
  popup_g:boolean=true;
  cbxPersona:boolean;

  sub:any;
  profilePhoto:string="";
  userGoogle: UserGoogle= new UserGoogle();
  provider:string="";
  fullname:string[]=[]
  constructor(public _auth:AuthService, private elem:ElementRef,private singupService: SingupService, private router: Router,private sellService: SellService) {   
    
  }
  ngOnInit() {

  }
  onSubmit(){
    this.regPerson();
  }
  regPerson(){
    this.reset();
    var patron = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    if(this.name==null || this.name==""){
        this.hidName=false;
        this.elem.nativeElement.querySelector('#name').focus();
      }else if(this.lastname==null || this.lastname==""){
        this.hidLastname=false;
        this.elem.nativeElement.querySelector('#lastname').focus();
      }else if(this.email==null || this.email==""){
        this.hidEmail=false;
        this.elem.nativeElement.querySelector('#email').focus();
      }else if(this.password==null || this.password==""){
        this.hidPassword=false;
        this.elem.nativeElement.querySelector('#password').focus();
      }else if(this.cbxPersona!=true){
        this.popup_terminos=false;
      }else if(!patron.test(this.email)){
        this.hidEmail2=false;
        this.elem.nativeElement.querySelector('#email').focus();
      }else{
        this.popup_g=false;

        this.person.createPerson(this.name, this.lastname,this.email,this.password,this.business);
        this.singupService.signUp(this.person).subscribe(
          res => {
                this.msg = JSON.parse(JSON.stringify(res))._body;
                if(this.msg=='save'){
                  this.popup_registro=false;
                  this.router.navigate(['/']);   
                }
                else{
                  this.popup_g=true;
                  if(this.msg=='email exist'){
                    this.popup_exist=false;
                  }else{
                    alert(this.msg);
                  }
                } 
              },
              error => {
                this.popup_g=true;
                console.log(error)
              }
        );
      }
  }

  popupHide(){
    this.popup_exist=true;
    this.popup_terminos=true;
  }

  reset(){
    this.hidName=true;
    this.hidLastname=true;
    this.hidEmail=true;
    this.hidEmail2=true;
    this.hidPassword=true;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  /*isFormDisabled(){
    if(this.condition==null||this.condition!=true||this.name==null||this.name.length==0||this.lastname==null || this.lastname.length==0||this.password==null||this.password.length==0||this.email==null){
      return true;
    }else{
      return false;
    }
  }*/
  keyPressEmail(event: any) {
    const patron = /[a-z0-9@.\-_]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patron.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressLetras(event: any){
    const pattern = /[a-zA-Z]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  googleLoginFunction(){
    this.sub = this._auth.login("google").subscribe(
      (data) => {
        this.userGoogle=JSON.parse(JSON.stringify(data));
        this.email=this.userGoogle.email;
        this.profilePhoto=this.userGoogle.image;
        this.provider=this.userGoogle.provider;
        this.fullname=this.userGoogle.name.split(" ");
        this.name=this.MaysPrimera(this.fullname[0]);
        this.lastname=this.MaysPrimera(this.fullname[1])+" "+this.MaysPrimera(this.fullname[2]);
        this.password="";
        this.cbxPersona=true;
      }
    );
  }
  facebookLoginFunction(){
    this.sub = this._auth.login("facebook").subscribe(
      (data) => {
        this.userGoogle=JSON.parse(JSON.stringify(data));
        this.email=this.userGoogle.email;
        this.profilePhoto=this.userGoogle.image;
        this.provider=this.userGoogle.provider;
        this.fullname=this.userGoogle.name.split(" ");
        this.name=this.MaysPrimera(this.fullname[0]);
        this.lastname=this.MaysPrimera(this.fullname[1])+" "+this.MaysPrimera(this.fullname[2]);
        this.password="";
        this.cbxPersona=true;
      }
    );
  }
  MaysPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
